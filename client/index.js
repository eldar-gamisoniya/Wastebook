import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'core/components/App';
import configureStore from './configureStore';

const store = configureStore(window.REDUX_INITIAL_STATE);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

if (module.hot) {
  module.hot.accept('core/components/App', () => {
    render();
  });
}

render();
