import { reducer as formReducer } from 'redux-form';

import { injectReducer } from 'utilities/asyncInjectors';
import reducer from './reducer';
import { MODULE_KEY } from './constants';
import StepManager from './containers/StepManager';

export const initModule = store => {
  injectReducer(store, 'form', formReducer);
  injectReducer(store, MODULE_KEY, reducer);
};

export default StepManager;
