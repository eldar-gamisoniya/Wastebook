import { createSelector } from 'reselect';

import { MODULE_KEY } from './constants';
import * as stepSelectors from './reducer';

const getState = state => state[MODULE_KEY];

export const getCurrentStep = createSelector(
  getState,
  stepSelectors.getCurrentStep,
);
