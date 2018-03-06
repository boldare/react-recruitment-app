import deepClone from '../services/utils/deepClone';
import {
  LAYOUT_ADD_MESSAGE, LAYOUT_OPEN_CHANGE_NAME_DIALOG, LAYOUT_REMOVE_MESSAGE,
  LAYOUT_SET_LOCALE
} from '../actions/layout';
import lookupLocale from '../i18n/services/lookupLocale';
import localStorage from '../services/localStorage';

// ------------------------------------
// State constants
// ------------------------------------
export const LAYOUT_LOCALE_KEY = 'locale';
export const LAYOUT_CHANGE_NAME_DIALOG_OPEN_KEY = 'isChangeNameDialogOpen';
export const LAYOUT_MESSAGES_KEY = 'messages';
const LAYOUT_LAST_MESSAGE_ID_KEY = 'lastMessageId';

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  [LAYOUT_LOCALE_KEY]: localStorage.getItem(LAYOUT_LOCALE_KEY) || lookupLocale(),
  [LAYOUT_CHANGE_NAME_DIALOG_OPEN_KEY]: false,
  [LAYOUT_MESSAGES_KEY]: [],
  [LAYOUT_LAST_MESSAGE_ID_KEY]: 0
};
const ACTION_HANDLERS = {
  [LAYOUT_OPEN_CHANGE_NAME_DIALOG]: (state, { payload }) => {
    const newState = deepClone(state);

    newState[LAYOUT_CHANGE_NAME_DIALOG_OPEN_KEY] = payload;

    return newState;
  },
  [LAYOUT_ADD_MESSAGE]: (state, { payload: message }) => {
    const newState = deepClone(state);
    const lastId = state[LAYOUT_LAST_MESSAGE_ID_KEY];

    newState[LAYOUT_MESSAGES_KEY].push({ id: lastId, message });
    newState[LAYOUT_LAST_MESSAGE_ID_KEY] = lastId + 1;

    return newState;
  },
  [LAYOUT_REMOVE_MESSAGE]: (state, { payload: id }) => {
    const newState = deepClone(state);

    const index = newState[LAYOUT_MESSAGES_KEY].findIndex(m => m.id === id);
    if (index >= 0) {
      newState[LAYOUT_MESSAGES_KEY].splice(index, 1);
    }

    return newState;
  },
  [LAYOUT_SET_LOCALE]: (state, { payload: locale }) => {
    const newState = deepClone(state);

    localStorage.setItem(LAYOUT_LOCALE_KEY, locale);
    newState[LAYOUT_LOCALE_KEY] = locale;

    return newState;
  }
};

export const layoutReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default layoutReducer;
