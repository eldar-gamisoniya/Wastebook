import { createSelector } from 'reselect';

import { STEP_MODULE_KEY } from './constants';
import * as stepSelectors from './reducers/steps';

const getSteps = state => state[STEP_MODULE_KEY];

export const getCurrentStep = createSelector(
  getSteps,
  stepSelectors.getCurrentStep,
);
