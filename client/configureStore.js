import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import coreReducers from './core/reducers';

const createRootReducer = () =>
  combineReducers({
    ...coreReducers,
    form: formReducer,
  });

const composeEnhancers = (...args) =>
  typeof window !== 'undefined'
    ? composeWithDevTools({})(...args)
    : compose(...args);

export default preloadedState => {
  const rootReducer = createRootReducer();
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const enchancers = composeEnhancers(middlewares);

  const store = createStore(rootReducer, preloadedState, enchancers);

  if (module.hot) {
    module.hot.accept('./core/reducers', () => {
      const newRootReducer = createRootReducer();
      store.replaceReducer(newRootReducer);
    });
  }

  return store;
};
