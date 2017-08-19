const fs = require('fs');
const path = require('path');

const rootPath = process.cwd();

// check if script started from root
if (!fs.existsSync(path.join(rootPath, 'package.json'))) {
  throw new Error("You should run webpack from the project's root.");
}

const clientAppPath = path.join(rootPath, 'client');
const serverAppPath = path.join(rootPath, 'server');
const clientOutputPath = path.join(rootPath, 'buildClient');

module.exports = {
  clientAppPath,
  clientOutputPath,
  coreAliasPath: path.join(clientAppPath, 'core'),
  modulesAliasPath: path.join(clientAppPath, 'modules'),
  sharedAliasPath: path.join(clientAppPath, 'shared'),
  utilitiesAliasPath: path.join(clientAppPath, 'utilities'),
  publicPath: '/static/',
  rootPath,
  npmModulesPath: path.join(rootPath, 'npm_modules'),
  serverAppPath,
  serverRenderPath: path.join(serverAppPath, 'ssr', 'render.js'),
  serverOutputPath: path.join(rootPath, 'buildServer'),
};
