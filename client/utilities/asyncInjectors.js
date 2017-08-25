import createRootReducer from './createRootReducer';

export const injectReducer = (store, key, asyncReducer) => {
  if (!store) throw new Error('Store is not initialized');
  if (store.asyncReducers[key]) return;

  store.asyncReducers[key] = asyncReducer; // eslint-disable-line no-param-reassign
  store.replaceReducer(createRootReducer(store.asyncReducers));
};
export const injectSagas = (store, sagas) => {
  if (!store) throw new Error('Store is not initialized');
  sagas.foreach(store.runSaga);
};
