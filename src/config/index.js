/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */ // For linting with CI.
let currentConfig = null;

console.log(`Running in ${process.env.NODE_ENV} env.`);

if (process.env.NODE_ENV === 'production' || process.argv[2] === 'production') {
  currentConfig = require('./production');
} else if (process.env.NODE_ENV === 'test' || process.argv[2] === 'test') {
  currentConfig = require('./production');
} else {
  currentConfig = require('./development');
}

module.exports = currentConfig;
