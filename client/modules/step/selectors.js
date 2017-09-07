import { MODULE_KEY } from './constants';
import * as stepSelectors from './reducer';

const getState = state => state[MODULE_KEY];

export const getCurrentStep = (state, sequence) =>
  stepSelectors.getCurrentStep(getState(state), sequence);
