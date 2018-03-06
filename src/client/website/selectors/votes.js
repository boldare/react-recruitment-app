
import { createSelector } from 'reselect';
import {
  RETRO_CARDS_KEY,
  CARD_VOTES_KEY
} from '../reducers/retro';
import {
  USER_ID_KEY
} from '../reducers/user';

const getRetroCards = state => state.retro[RETRO_CARDS_KEY];

const getUserId = state => state.user[USER_ID_KEY];

export const getUserSubmittedVotes = createSelector(
  [getRetroCards, getUserId],
  (cards, userId) => (cards.reduce((sub, card) =>
    (sub + card[CARD_VOTES_KEY].filter(v => v === userId).length),
  0)
  )
);
