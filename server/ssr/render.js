import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from 'core/containers/App';
import configureStore from './configureStore';

const deferScripts = (scripts, publicPath) =>
  scripts
    .map(
      script =>
        `<script type="text/javascript" src="${publicPath}/${script}"></script>`,
    )
    .join('');

const preloadScripts = (scripts, publicPath) =>
  scripts
    .map(
      script =>
        `<link rel="preload" href="${publicPath}/${script}" as="script" >`,
    )
    .join('');

export default ({ clientStats }) => async (req, res) => {
  const store = await configureStore(req, res);
  if (!store) return;

  const app = ReactDOM.renderToString(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  const chunkNames = flushChunkNames();

  const { styles, cssHash, scripts, publicPath } = flushChunks(clientStats, {
    chunkNames,
    // need to list all commons chunks here for now
    before: ['manifest', 'vendor', 'app-async', 'app-async-vendor'],
    after: ['app'],
  });
  const htmlScripts = deferScripts(scripts, publicPath);
  const preloadedScripts = preloadScripts(scripts, publicPath);
  const state = JSON.stringify(store.getState());
  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${preloadedScripts}
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
          ${cssHash}
          <script>window.REDUX_INITIAL_STATE = ${state}</script>
          ${htmlScripts}
        </body>
      </html>`,
  );
};
