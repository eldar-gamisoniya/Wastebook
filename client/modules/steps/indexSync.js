import { reducer as formReducer } from 'redux-form';

import { reducer as stepReducer, STEP_REDUCER_KEY } from 'modules/step';
import { injectReducer, injectSagas } from 'utilities/asyncInjectors';
import StepManager from './containers/StepManager';
import sagas from './sagas';

export const initModule = store => {
  injectReducer(store, 'form', formReducer);
  injectReducer(store, STEP_REDUCER_KEY, stepReducer);
  injectSagas(store, sagas);
};

export default StepManager;
