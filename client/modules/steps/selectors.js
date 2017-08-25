import { createSelector } from 'reselect';

import { MODULE_KEY } from './constants';
import * as stepSelectors from './reducer';

const getSteps = state => state[MODULE_KEY];

export const getCurrentStep = createSelector(
  getSteps,
  stepSelectors.getCurrentStep,
);
