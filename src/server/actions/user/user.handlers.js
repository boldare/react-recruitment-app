import { ACTION_USER_CONNECT, ACTION_USER_DISCONNECT, ACTION_USER_SET_NAME } from './user.actions';
import User from '../../models/user.model';
import { ACTION_RETRO_LEAVE } from '../retro/retro.actions';

export default {
  [ACTION_USER_CONNECT]: async (params) => {
    const { token } = params;
    let user = await User.findOne({ token });
    if (!user) {
      user = await new User({ name: 'New user' }).save();
    }
    return {
      state: { userId: user.id },
      emit: {
        id: user.id,
        name: user.name,
        token: user.token
      }
    };
  },
  [ACTION_USER_SET_NAME]: async (params, state) => {
    const { name } = params;
    const { userId } = state;

    if (!userId) {
      throw new Error('You are not logged in.');
    }
    if (!name) {
      throw new Error('Name is missing.');
    }

    const updated = await User.findByIdAndUpdate(userId, {
      name
    }, {
      new: true
    });
    if (!updated) {
      throw new Error('User couldn\'t have been updated.');
    }

    return {
      broadcast: { id: userId, name }
    };
  },
  [ACTION_USER_DISCONNECT]: async (params, state, perform) => {
    const { retroId, userId } = state;
    if (!userId) throw new Error('Missing user identifier');
    if (retroId) {
      await perform(ACTION_RETRO_LEAVE, { retroId });
    }
    return {};
  }
};
