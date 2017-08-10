import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import App from '../../client/App';

const deferScripts = (scripts, publicPath) =>
  scripts
    .map(
      script =>
        `<script type="text/javascript" src="${publicPath}/${script}" defer></script>`
    )
    .join('');

export default ({ clientStats }) => (req, res) => {
  const app = ReactDOM.renderToString(<App />);
  const chunkNames = flushChunkNames();

  const {
    styles,
    cssHash,
    scripts,
    stylesheets,
    publicPath,
  } = flushChunks(clientStats, {
    chunkNames,
    before: ['manifest'],
    after: ['app'],
  });
  const htmlScripts = deferScripts(scripts, publicPath);

  if (process.env.NODE_ENV !== 'production') {
    console.log('PATH', req.path);
    console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames);
    console.log('SCRIPTS SERVED', scripts);
    console.log('STYLESHEETS SERVED', stylesheets);
  }
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
          ${htmlScripts}
        </body>
      </html>`
  );
};
