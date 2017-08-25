import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from 'core/components/App';
import configureStore from './configureStore';

const deferScripts = (scripts, publicPath) =>
  scripts
    .map(
      script =>
        `<script type="text/javascript" src="${publicPath}/${script}" defer></script>`,
    )
    .join('');

let initialStore = null;

export default ({ clientStats }) => async (req, res) => {
  const store = await configureStore(req, res);
  if (!store) return;

  // hack while onLoad not triggering on the server
  if (!initialStore) initialStore = store;

  const app = ReactDOM.renderToString(
    <Provider store={initialStore}>
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
  const state = JSON.stringify(initialStore.getState());
  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
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
