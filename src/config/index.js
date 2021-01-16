/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */ // For linting with CI.
let currentConfig = null;
const env = process.argv[2] || process.env.NODE_ENV || 'development';

console.log(`Running in ${process.env.NODE_ENV} env.`);

if (env === 'production') {
  currentConfig = require('./production');
} else if (env === 'test') {
  currentConfig = require('./production');
} else {
  currentConfig = require('./development');
}

currentConfig.env = env;

module.exports = currentConfig;
