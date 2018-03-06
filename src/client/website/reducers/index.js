import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import layout from './layout';
import retro from './retro';
import user from './user';

const rootReducer = combineReducers({
  layout,
  retro,
  user,
  form
});

export default rootReducer;
