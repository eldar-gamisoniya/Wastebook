import * as constants from './constants';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  const sequenceName = payload && payload.sequence;
  const sequence = state[sequenceName] || 0;
  switch (type) {
    case constants.NEXT_STEP:
      return { ...state, [sequenceName]: sequence + 1 };
    case constants.PREVIOUS_STEP:
      return { ...state, [sequenceName]: Math.max(sequence - 1, 0) };
    case constants.STEP_FAILURE:
      return {
        ...state,
        [sequenceName]: payload.beginFromStart
          ? 0
          : Math.max(payload.step - 1, 0),
      };
    default:
      return state;
  }
};

export const getCurrentStep = (state, { sequence }) => state[sequence] || 0;
