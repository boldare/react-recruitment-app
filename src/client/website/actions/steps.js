export const ACTION_STEPS_CHANGE = 'steps/change';
export const STEPS_CHANGE_IN_PROGRESS = 'CHANGE_STEP_IN_PROGRESS';
export const STEPS_CHANGE_SUCCESS = 'CHANGE_STEP_SUCCESS';
export const STEPS_CHANGE_FAILURE = 'CHANGE_STEP_FAILURE';

export const changeStep = (socket, step) => (dispatch) => {
  socket.emit(ACTION_STEPS_CHANGE, { step });
  dispatch({ type: STEPS_CHANGE_IN_PROGRESS });
};
