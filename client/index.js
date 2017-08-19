import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'modules/core/components/App';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root'),
  );
};

if (module.hot) {
  // importing not from modules/core for hot reloading when only component changes
  module.hot.accept('modules/core/components/App', () => {
    render();
  });
}

render();
