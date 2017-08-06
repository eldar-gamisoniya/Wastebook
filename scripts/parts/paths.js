const fs = require('fs');
const path = require('path');

const rootPath = process.cwd();

// check if script started from root
if (!fs.existsSync(path.join(rootPath, 'webpack.config.js')) ||
  !fs.existsSync(path.join(rootPath, 'package.json'))) {
  throw new Error('You should run webpack from the project\'s root.');
}

module.exports = {
  clientAppPath: path.join(rootPath, 'client'),
  outputPath: path.join(rootPath, 'build'),
};
