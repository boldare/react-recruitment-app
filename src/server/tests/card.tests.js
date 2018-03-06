import { assert } from 'chai';
import mongoose from 'mongoose';

import connectToDatabase from '../database';
import User from '../models/user.model';
import Retro from '../models/retro.model';
import { ACTION_CARD_ADD, ACTION_CARD_EDIT, ACTION_CARD_REMOVE } from '../actions/card/card.actions';
import handlers from '../actions/card/card.handlers';
import { getId, getIds } from '../utils';
import { assertError } from './test.utils';

describe('Card actions', () => {
  let testState;

  before(async () => {
    await connectToDatabase();
  });

  beforeEach(async () => {
    const scrumMaster = await new User({ name: 'Test User' }).save();
    const user = await new User({ name: 'Test User' }).save();
    const column = { _id: mongoose.Types.ObjectId(), name: 'Test Column', icon: 'action' };
    const retro = await new Retro({
      columns: [{ name: 'First', icon: 'positive' }, column, { name: 'Second', icon: 'negative' }],
      users: [{ user }, { user: scrumMaster }],
      scrumMaster
    }).save();
    testState = {
      retroId: retro.id,
      userId: user.id,
      user,
      scrumMasterId: scrumMaster.id,
      columnId: getId(column._id)
    };
  });

  afterEach(async () => {
    await User.remove();
    await Retro.remove();
  });

  describe('Create', () => {
    it('should be able to create a card in an existing column', async () => {
      const { columnId, retroId, userId, user } = testState;
      const params = { text: 'Sample card text.', columnId };
      const state = { userId, retroId };

      const result = await handlers[ACTION_CARD_ADD](params, state);
      const card = result.broadcast;

      // Check handler result
      assert.notEqual(card, undefined);
      assert.equal(card._id, undefined);
      assert.notEqual(card.id, undefined);
      assert.deepEqual(card.authors, [user]);
      assert.deepEqual(card.votes, [userId]);
      assert.equal(card.text, params.text);
      assert.equal(card.columnId, params.columnId);

      // Check value in the database
      const retro = await Retro.findById(retroId);
      assert.equal(retro.cards.length, 1);
      const databaseCard = retro.cards[0];
      assert.equal(databaseCard._id, card.id);
      assert.equal(databaseCard.text, card.text);
      assert.deepEqual(getIds(databaseCard.authors), card.authors);
      assert.deepEqual(getIds(databaseCard.votes), card.votes);
    });

    it('should error when creating a card in nonexistent column', async () => {
      const { columnId, retroId, userId } = testState;
      const params = { text: 'Sample card text.', columnId: `${columnId}abc` };
      const state = { userId, retroId };

      await assertError(handlers[ACTION_CARD_ADD](params, state),
        'Column incorrect or not selected.');
    });

    it('should error when creating a card without columnId parameter', async () => {
      const { retroId, userId } = testState;
      const params = { text: 'Sample card text.' };
      const state = { userId, retroId };

      await assertError(handlers[ACTION_CARD_ADD](params, state),
        'Column incorrect or not selected.');
    });

    it('should error when creating a card without text parameter', async () => {
      const { retroId, userId, columnId } = testState;
      const params = { columnId };
      const state = { userId, retroId };

      await assertError(handlers[ACTION_CARD_ADD](params, state),
        'Card text must not be empty.');
    });

    it('should error when creating a card with incomplete state', async () => {
      const { retroId, userId } = testState;
      const params = { text: 'Sample card text.' };

      await assertError(handlers[ACTION_CARD_ADD](params, { retroId }),
        'You are not participating in a retrospective.');
      await assertError(handlers[ACTION_CARD_ADD](params, { userId }),
        'You are not participating in a retrospective.');
      await assertError(handlers[ACTION_CARD_ADD](params, {}),
        'You are not participating in a retrospective.');
    });
  });

  describe('Update', () => {
    beforeEach(async () => {
      const { columnId, retroId, userId } = testState;
      const params = { text: 'Sample card text.', columnId };
      const state = { userId, retroId };

      const result = await handlers[ACTION_CARD_ADD](params, state);
      testState.cardId = result.broadcast.id;
    });

    it('should be able to edit a card', async () => {
      const { cardId, retroId, userId } = testState;
      const params = { text: 'Modified card text.', id: cardId };
      const state = { userId, retroId };

      const result = await handlers[ACTION_CARD_EDIT](params, state);
      const card = result.broadcast;

      // Check handler result
      assert.notEqual(card, undefined);
      assert.equal(card._id, undefined);
      assert.notEqual(card.id, undefined);
      assert.deepEqual(card.authors, [userId]);
      assert.deepEqual(card.votes, [userId]);
      assert.equal(card.text, params.text);
      assert.equal(card.columnId, params.columnId);

      // Check value in the database
      const retro = await Retro.findById(retroId);
      assert.equal(retro.cards.length, 1);
      const databaseCard = retro.cards[0];
      assert.equal(databaseCard._id, card.id);
      assert.equal(databaseCard.text, card.text);
      assert.deepEqual(getIds(databaseCard.authors), card.authors);
      assert.deepEqual(getIds(databaseCard.votes), card.votes);
    });

    it('should error when editing a card without id parameter', async () => {
      const { retroId, userId } = testState;
      const params = { text: 'Modified card text.' };
      const state = { userId, retroId };

      await assertError(handlers[ACTION_CARD_EDIT](params, state),
        'Card not updated because it doesn\'t exist or you don\'t have sufficient privileges.');
    });

    it('should error when editing a card of somebody else', async () => {
      const { cardId, retroId, scrumMasterId } = testState;
      const params = { text: 'Modified card text.', id: cardId };
      const state = { userId: scrumMasterId, retroId };

      await assertError(handlers[ACTION_CARD_EDIT](params, state),
        'Card not updated because it doesn\'t exist or you don\'t have sufficient privileges.');
    });
  });

  describe('Delete', () => {
    beforeEach(async () => {
      const { columnId, retroId, userId } = testState;
      const state = { userId, retroId };

      const result = await handlers[ACTION_CARD_ADD](
        { text: 'Sample card text.', columnId }, state);
      testState.cardId = result.broadcast.id;

      const result2 = await handlers[ACTION_CARD_ADD](
        { text: 'Sample card text 2.', columnId }, state);
      testState.cardId2 = result2.broadcast.id;
    });

    it('should be able to remove a card', async () => {
      const { cardId, cardId2, retroId, userId } = testState;
      const params = { text: 'Modified card text.', id: cardId };
      const state = { userId, retroId };

      const result = await handlers[ACTION_CARD_REMOVE](params, state);
      const removedCard = result.broadcast;

      assert.equal(removedCard.id, cardId);

      const retro = await Retro.findById(retroId);
      assert.equal(retro.cards.length, 1);
      assert.equal(retro.cards[0]._id, cardId2);
    });

    it('should error when removing a card without id parameter', async () => {
      const { retroId, userId } = testState;
      const params = { text: 'Modified card text.' };
      const state = { userId, retroId };

      await assertError(handlers[ACTION_CARD_REMOVE](params, state),
        'Card not removed because it doesn\'t exist or you don\'t have sufficient privileges.');
    });

    it('should error when removing a card of somebody else', async () => {
      const { cardId, retroId, scrumMasterId } = testState;
      const params = { text: 'Modified card text.', id: cardId };
      const state = { userId: scrumMasterId, retroId };

      await assertError(handlers[ACTION_CARD_REMOVE](params, state),
        'Card not removed because it doesn\'t exist or you don\'t have sufficient privileges.');
    });
  });
});
