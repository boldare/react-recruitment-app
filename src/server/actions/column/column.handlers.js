import mongoose from 'mongoose';
import Retro from '../../models/retro.model';
import { ACTION_COLUMN_ADD, ACTION_COLUMN_EDIT, ACTION_COLUMN_REMOVE } from './column.actions';
import { toMongoId } from '../../utils';

export default {
  [ACTION_COLUMN_ADD]: async (params, state) => {
    const { name, icon } = params;
    const { retroId, userId } = state;

    const retro = await Retro.findById(retroId);
    if (!retro.participates(userId)) {
      throw new Error('You are not participating in a retrospective.');
    }
    if (!retro.isScrumMaster(userId)) {
      throw new Error('Only a scrum master can rename a retrospective.');
    }
    const column = {
      _id: mongoose.Types.ObjectId(),
      name,
      icon
    };

    await Retro.findByIdAndUpdate(retroId, {
      $push: { columns: column }
    });
    return {
      broadcast: {
        ...column,
        _id: undefined,
        id: column._id
      }
    };
  },
  [ACTION_COLUMN_EDIT]: async (params, state) => {
    const { id: columnId, name } = params;
    const { retroId, userId } = state;

    const retro = await Retro.findById(retroId);
    if (!retro.participates(userId)) {
      throw new Error('You are not participating in a retrospective.');
    }
    if (!retro.isScrumMaster(userId)) {
      throw new Error('Only a scrum master can rename a retrospective.');
    }
    await Retro.findOneAndUpdate(
      { _id: retroId, 'columns.id': columnId },
      { 'columns.0.name': name }).exec();
    return {
      broadcast: { id: columnId, name }
    };
  },
  [ACTION_COLUMN_REMOVE]: async (params, state) => {
    const { id: columnId } = params;
    const { retroId, userId } = state;

    const retro = await Retro.findById(retroId);
    if (!retro.participates(userId)) {
      throw new Error('You are not participating in a retrospective.');
    }
    if (!retro.isScrumMaster(userId)) {
      throw new Error('Only a scrum master can remove a column.');
    }
    const update = await Retro.findOneAndUpdate(
      { _id: retroId },
      { $pull: { columns: { _id: toMongoId(columnId) } } }
    ).exec();
    if (!update) throw new Error('Could not remove column.');
    return {
      broadcast: { id: columnId }
    };
  }
};
