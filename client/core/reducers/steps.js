import { STEP_VALIDATE, STEP_FAILURE } from '../constants';

const initialState = {
  currentStep: 1,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case STEP_VALIDATE:
      return {
        ...state,
        currentStep: Math.max(state.currentStep, payload.step),
      };
    case STEP_FAILURE:
      return {
        ...state,
        currentStep: Math.min(state.currentStep, payload.step),
      };
    default:
      return state;
  }
};
