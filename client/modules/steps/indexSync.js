import { reducer as formReducer } from 'redux-form';

import { reducer as stepReducer, STEP_REDUCER_KEY } from 'modules/step';
import { injectReducer } from 'utilities/asyncInjectors';
import reducer from './reducer';
import { MODULE_KEY } from './constants';
import StepManager from './containers/StepManager';

export const initModule = store => {
  injectReducer(store, 'form', formReducer);
  injectReducer(store, STEP_REDUCER_KEY, stepReducer);
  injectReducer(store, MODULE_KEY, reducer);
};

export default StepManager;
