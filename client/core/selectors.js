import { createSelector } from 'reselect';

import { STEP_MODULE_KEY } from './constants';

const getSteps = state => state[STEP_MODULE_KEY];

export const getCurrentStep = createSelector(
  getSteps,
  steps => steps.currentStep,
);
