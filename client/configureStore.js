import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import createRootReducer from 'utilities/createRootReducer';
import { initAsyncStore } from 'utilities/asyncInjectors';

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
  store.asyncReducers = {};
  store.runSaga = sagaMiddleware.run;
  initAsyncStore(store);

  if (module.hot) {
    module.hot.accept('./core/reducers', () => {
      const newRootReducer = createRootReducer();
      store.replaceReducer(newRootReducer);
    });
  }

  return store;
};
