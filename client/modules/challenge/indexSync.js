import { reducer as formReducer } from 'redux-form';

import { reducer as stepReducer, STEP_REDUCER_KEY } from 'modules/step';
import { injectReducer, injectSaga } from 'utilities/asyncInjectors';
import Challenge from './containers/Challenge';
import saga from './sagas';

export const initModule = store => {
  injectReducer(store, 'form', formReducer);
  injectReducer(store, STEP_REDUCER_KEY, stepReducer);
  injectSaga(store, saga);
};

export default Challenge;
