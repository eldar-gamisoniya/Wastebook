import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import createRootReducer from 'utilities/createRootReducer';

const composeEnhancers = (...args) =>
  typeof window !== 'undefined'
    ? composeWithDevTools({})(...args)
    : compose(...args);

const configureStore = preloadedState => {
  const rootReducer = createRootReducer();
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const enchancers = composeEnhancers(middlewares);

  const store = createStore(rootReducer, preloadedState, enchancers);
  store.asyncReducers = {};
  store.runSaga = sagaMiddleware.run;

  if (module.hot) {
    module.hot.accept('./core/reducer', () => {
      const newRootReducer = createRootReducer();
      store.replaceReducer(newRootReducer);
    });
  }

  return store;
};
export default configureStore;
