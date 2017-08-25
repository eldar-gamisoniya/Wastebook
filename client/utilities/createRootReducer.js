import { combineReducers } from 'redux';

import coreReducers from 'core/reducer';

export default asyncReducers =>
  combineReducers({
    ...coreReducers,
    ...asyncReducers,
  });
