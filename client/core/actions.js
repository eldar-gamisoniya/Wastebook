import { STEP_VALIDATE, STEP_FAILURE } from './constants';

export const stepValidated = step => ({
  type: STEP_VALIDATE,
  payload: {
    step,
  },
});

export const stepFailed = step => ({
  type: STEP_FAILURE,
  payload: {
    step,
  },
});
