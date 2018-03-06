export const ACTION_USER_CONNECT = 'user/connect';
export const USER_CONNECT_IN_PROGRESS = 'USER_CONNECT_IN_PROGRESS';
export const USER_CONNECT_SUCCESS = 'USER_CONNECT_SUCCESS';
export const USER_CONNECT_FAILURE = 'USER_CONNECT_FAILURE';

export const ACTION_USER_SET_NAME = 'user/set-name';
export const USER_SET_NAME_IN_PROGRESS = 'USER_SET_NAME_IN_PROGRESS';
export const USER_SET_NAME_SUCCESS = 'USER_SET_NAME_SUCCESS';
export const USER_SET_NAME_FAILURE = 'USER_SET_NAME_FAILURE';

export const USER_DISCONNECT = 'USER_DISCONNECT';

export const userConnect = (socket, token) => (dispatch) => {
  socket.emit(ACTION_USER_CONNECT, { token });
  dispatch({ type: USER_CONNECT_IN_PROGRESS });
};

export const userSetName = (socket, name) => (dispatch) => {
  socket.emit(ACTION_USER_SET_NAME, { name });
  dispatch({ type: USER_SET_NAME_IN_PROGRESS });
};

export const userDisconnect = () => (dispatch) => {
  dispatch({ type: USER_DISCONNECT });
};
