import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import coreReducers from 'core/reducers';

export default asyncReducers =>
  combineReducers({
    form: formReducer,
    ...coreReducers,
    ...asyncReducers,
  });
