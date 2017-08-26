import * as constants from './constants';

export const nextStep = sequence => ({
  type: constants.NEXT_STEP,
  payload: {
    sequence,
  },
});

export const previousStep = sequence => ({
  type: constants.PREVIOUS_STEP,
  payload: {
    sequence,
  },
});

export const stepFailed = (sequence, step, beginFromStart = false) => ({
  type: constants.NEXT_STEP,
  payload: {
    sequence,
    step,
    beginFromStart,
  },
});
