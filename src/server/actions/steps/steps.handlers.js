import Retro from '../../models/retro.model';
import { ACTION_STEPS_CHANGE } from './steps.actions';

export default {
    [ACTION_STEPS_CHANGE]: async (params, state) => {
    const { retroId, userId } = state;
    const { step } = params;
    const retro = await Retro.findById(retroId);
    if (!retro || !retro.participates(userId)) {
      throw new Error('You are not participating in a retrospective.');
    }
    if (!retro.isScrumMaster(userId)) {
      throw new Error('Only a scrum master can change step.');
    }
    console.log('Handler:', step);
    const updated = await Retro.findOneAndUpdate(
      { _id: retroId },
      { step }
    ).exec();

    if (!updated) {
      throw new Error('Couldn\'t change step.');
    }

    return {
      broadcast: {
        step
      }
    };
  }
};
