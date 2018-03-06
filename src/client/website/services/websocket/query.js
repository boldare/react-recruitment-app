import PropTypes from 'prop-types';
import deepClone from '../utils/deepClone';

export const QUERY_STATUS_NOT_READY = 'notReady';
export const QUERY_STATUS_SUCCESS = 'success';
export const QUERY_STATUS_IN_PROGRESS = 'inProgress';
export const QUERY_STATUS_FAILURE = 'failure';

export const QUERY_STATUS_KEY = 'status';
export const QUERY_ERROR_KEY = 'error';

export const QUERY_DEFAULT = () => ({
  [QUERY_STATUS_KEY]: QUERY_STATUS_NOT_READY,
  [QUERY_ERROR_KEY]: undefined
});

const entryToReducer = (ENTRY, handler) => {
  const reducer = {};
  if (typeof ENTRY === 'string') {
    reducer[ENTRY] = (state, { payload }) => handler(state, payload);
  } else {
    const key = Object.keys(ENTRY)[0];
    const customHandler = ENTRY[key];
    reducer[key] = (state, { payload }) => handler(customHandler(state, payload), payload);
  }
  return reducer;
};

export const handleQuery = ([IN_PROGRESS, SUCCESS, FAILURE], QUERY_KEY) => ({
  ...entryToReducer(IN_PROGRESS, (state) => {
    const newState = deepClone(state);

    newState[QUERY_KEY] = {
      [QUERY_STATUS_KEY]: QUERY_STATUS_IN_PROGRESS,
      [QUERY_ERROR_KEY]: undefined
    };

    return newState;
  }),
  ...entryToReducer(SUCCESS, (state) => {
    const newState = deepClone(state);

    newState[QUERY_KEY] = {
      [QUERY_STATUS_KEY]: QUERY_STATUS_SUCCESS,
      [QUERY_ERROR_KEY]: undefined
    };

    return newState;
  }),
  ...entryToReducer(FAILURE, (state, payload) => {
    const newState = deepClone(state);
    const { message } = payload;

    newState[QUERY_KEY] = {
      [QUERY_STATUS_KEY]: QUERY_STATUS_FAILURE,
      [QUERY_ERROR_KEY]: message
    };

    return newState;
  })
});

export const queryStatusChanged = (query, nextQuery) =>
  query[QUERY_STATUS_KEY] !== nextQuery[QUERY_STATUS_KEY];

export const queryFailed = (query, nextQuery) => queryStatusChanged(query, nextQuery)
  && nextQuery[QUERY_STATUS_KEY] === QUERY_STATUS_FAILURE;

export const querySucceeded = (query, nextQuery) => queryStatusChanged(query, nextQuery)
  && nextQuery[QUERY_STATUS_KEY] === QUERY_STATUS_SUCCESS;

export const QueryShape = {
  [QUERY_STATUS_KEY]: PropTypes.oneOf([
    QUERY_STATUS_SUCCESS,
    QUERY_STATUS_FAILURE,
    QUERY_STATUS_NOT_READY,
    QUERY_STATUS_IN_PROGRESS
  ]).isRequired,
  [QUERY_ERROR_KEY]: PropTypes.string
};
