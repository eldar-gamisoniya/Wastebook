import React from 'react';
import { reducer as formReducer } from 'redux-form';

import { injectReducer } from 'utilities/asyncInjectors';
import reducer from './reducer';
import { MODULE_KEY } from './constants';

export const initModule = store => {
  injectReducer(store, 'form', formReducer);
  injectReducer(store, MODULE_KEY, reducer);
};

const StepsComponent = () => <div>Steps async component</div>;
export default StepsComponent;
