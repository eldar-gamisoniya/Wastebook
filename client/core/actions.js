import { STEP_SUCCESS, STEP_FAILURE } from './constants';

export const stepSuccessed = step => ({
  type: STEP_SUCCESS,
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
