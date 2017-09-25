import React from 'react';
import { reducer as formReducer } from 'redux-form';

import { reducer as stepReducer, STEP_REDUCER_KEY } from 'modules/step';
import { injectModule } from 'utilities/asyncInjectors';
import Challenge from './containers/Challenge';
import saga from './sagas';

export const initModule = store => {
  injectModule(store, 'form', { reducer: formReducer });
  injectModule(store, STEP_REDUCER_KEY, { reducer: stepReducer, saga });
};

export default Challenge;

export const hello = () => <div>Hello, World</div>;
