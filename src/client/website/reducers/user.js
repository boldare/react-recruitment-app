import deepClone from '../services/utils/deepClone';
import localStorage from '../services/localStorage';
import {
  USER_CONNECT_SUCCESS, USER_CONNECT_FAILURE, USER_CONNECT_IN_PROGRESS,
  USER_SET_NAME_SUCCESS, USER_SET_NAME_FAILURE, USER_SET_NAME_IN_PROGRESS, USER_DISCONNECT
} from '../actions/user';
import {
  handleQuery, QUERY_DEFAULT
} from '../services/websocket/query';

// ------------------------------------
// State constants
// ------------------------------------
export const USER_CONNECTED_KEY = 'connected';
export const USER_TOKEN_KEY = 'token';
export const USER_NAME_KEY = 'name';
export const USER_ID_KEY = 'userId';
export const USER_REMAINING_VOTES_KEY = 'remainingVotes';
export const USER_CONNECT_QUERY_KEY = 'connectQuery';
export const USER_SET_NAME_QUERY_KEY = 'connectQuery';

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  [USER_CONNECTED_KEY]: false,
  [USER_ID_KEY]: undefined,
  [USER_TOKEN_KEY]: localStorage.getItem(USER_TOKEN_KEY),
  [USER_NAME_KEY]: undefined,
  [USER_REMAINING_VOTES_KEY]: undefined,
  [USER_CONNECT_QUERY_KEY]: QUERY_DEFAULT(),
  [USER_SET_NAME_QUERY_KEY]: QUERY_DEFAULT()
};

const ACTION_HANDLERS = {
  ...handleQuery([
    USER_CONNECT_IN_PROGRESS,
    {
      [USER_CONNECT_SUCCESS](state, payload) {
        const newState = deepClone(state);
        const { id, token, name } = payload;

        newState[USER_ID_KEY] = id;
        newState[USER_CONNECTED_KEY] = true;
        newState[USER_TOKEN_KEY] = token;
        localStorage.setItem(USER_TOKEN_KEY, token);
        newState[USER_NAME_KEY] = name;

        return newState;
      }
    },
    USER_CONNECT_FAILURE
  ], USER_CONNECT_QUERY_KEY),
  ...handleQuery([
    USER_SET_NAME_IN_PROGRESS,
    {
      [USER_SET_NAME_SUCCESS](state, payload) {
        const newState = deepClone(state);
        const { name, id } = payload;

        if (newState[USER_ID_KEY] === id) newState[USER_NAME_KEY] = name;

        return newState;
      }
    },
    USER_SET_NAME_FAILURE
  ], USER_SET_NAME_QUERY_KEY),
  [USER_DISCONNECT]: (state) => {
    const newState = deepClone(state);
    newState[USER_CONNECTED_KEY] = false;

    return newState;
  }
};

export const userReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default userReducer;
