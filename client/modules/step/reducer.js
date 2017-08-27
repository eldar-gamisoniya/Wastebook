import * as constants from './constants';

const initialState = {};

const sequenceInitialState = { currentStep: 0, errors: {} };
const sequenceReducer = (state = sequenceInitialState, { type, payload }) => {
  let nextStep;
  switch (type) {
    case constants.NEXT_STEP:
      nextStep = state.currentStep + 1;
      while (state.errors[nextStep] === false) nextStep += 1;
      return {
        currentStep: nextStep,
        errors: { ...state.errors, [state.currentStep]: false },
      };
    case constants.PREVIOUS_STEP:
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };
    case constants.STEP_FAILURE:
      return {
        currentStep: payload.beginFromStart ? 0 : Math.max(payload.step, 0),
        errors: { ...state.errors, [payload.step]: true },
      };
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  const sequenceName = action.payload && action.payload.sequence;
  const sequence = state[sequenceName];
  switch (action.type) {
    case constants.NEXT_STEP:
      return { ...state, [sequenceName]: sequenceReducer(sequence, action) };
    case constants.PREVIOUS_STEP:
      return { ...state, [sequenceName]: sequenceReducer(sequence, action) };
    case constants.STEP_FAILURE:
      return { ...state, [sequenceName]: sequenceReducer(sequence, action) };
    default:
      return state;
  }
};

export const getCurrentStep = (state, sequence) =>
  (state[sequence] && state[sequence].currentStep) || 0;
