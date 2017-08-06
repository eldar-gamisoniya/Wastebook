const fs = require('fs');
const path = require('path');

const rootPath = process.cwd();

// check if script started from root
if (!fs.existsSync(path.join(rootPath, 'package.json'))) {
  throw new Error('You should run webpack from the project\'s root.');
}

const serverAppPath = path.join(rootPath, 'server');

module.exports = {
  clientAppPath: path.join(rootPath, 'client'),
  clientOutputPath: path.join(rootPath, 'clientBuild'),
  publicPath: '/static/',
  rootPath,
  npmModulesPath: path.join(rootPath, 'npm_modules'),
  serverAppPath,
  serverRenderPath: path.join(serverAppPath, 'render.js'),
  serverOutputPath: path.join(rootPath, 'serverBuild'),
};
