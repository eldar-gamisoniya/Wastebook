import createRootReducer from './createRootReducer';

// for now save the store as the singletone
let asyncStore = null;

export const initAsyncStore = store => {
  if (!store.asyncReducers || !store.runSaga)
    throw new Error('Store has no fields for injection');
  asyncStore = store;
};

export const injectReducer = (key, asyncReducer) => {
  if (!asyncStore) throw new Error('Store is not initialized');
  if (asyncStore.asyncReducers[key]) return;

  asyncStore.asyncReducers[key] = asyncReducer; // eslint-disable-line no-param-reassign
  asyncStore.replaceReducer(createRootReducer(asyncStore.asyncReducers));
};
export const injectSagas = sagas => {
  if (!asyncStore) throw new Error('Store is not initialized');
  sagas.foreach(asyncStore.runSaga);
};
