import createRootReducer from './createRootReducer';

const injectReducer = (store, key, asyncReducer) => {
  if (store.asyncReducers[key]) return;

  store.asyncReducers[key] = asyncReducer; // eslint-disable-line no-param-reassign
  store.replaceReducer(createRootReducer(store.asyncReducers));
};

const injectSaga = (store, saga) => {
  store.runSaga(saga);
};

export const injectModule = (store, key, { reducer, saga }) => {
  if (!store) throw new Error('Store is not initialized');
  if (store.modules[key]) return false;

  store.modules[key] = true; // eslint-disable-line no-param-reassign
  if (reducer) {
    injectReducer(store, key, reducer);
  }
  if (saga) {
    injectSaga(store, saga);
  }

  return true;
};
