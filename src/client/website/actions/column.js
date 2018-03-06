export const ACTION_COLUMN_ADD = 'column/add';
export const COLUMN_ADD_IN_PROGRESS = 'COLUMN_ADD_IN_PROGRESS';
export const COLUMN_ADD_SUCCESS = 'COLUMN_ADD_SUCCESS';
export const COLUMN_ADD_FAILURE = 'COLUMN_ADD_FAILURE';

export const ACTION_COLUMN_EDIT = 'column/edit';
export const COLUMN_EDIT_IN_PROGRESS = 'COLUMN_EDIT_IN_PROGRESS';
export const COLUMN_EDIT_SUCCESS = 'COLUMN_EDIT_SUCCESS';
export const COLUMN_EDIT_FAILURE = 'COLUMN_EDIT_FAILURE';

export const ACTION_COLUMN_REMOVE = 'column/remove';
export const COLUMN_REMOVE_IN_PROGRESS = 'COLUMN_REMOVE_IN_PROGRESS';
export const COLUMN_REMOVE_SUCCESS = 'COLUMN_REMOVE_SUCCESS';
export const COLUMN_REMOVE_FAILURE = 'COLUMN_REMOVE_FAILURE';

export const columnAdd = (socket, name, icon) => (dispatch) => {
  socket.emit(ACTION_COLUMN_ADD, { name, icon });
  dispatch({ type: COLUMN_ADD_IN_PROGRESS });
};

export const columnRemove = (socket, columnId) => (dispatch) => {
  socket.emit(ACTION_COLUMN_REMOVE, { id: columnId });
  dispatch({ type: COLUMN_REMOVE_IN_PROGRESS });
};

export const columnEdit = (socket, column) => (dispatch) => {
  socket.emit(ACTION_COLUMN_EDIT, column);
  dispatch({ type: COLUMN_EDIT_IN_PROGRESS });
};
