module.exports = {
  root: true,

  env: {
    node: true,
    commonjs: true,
    'jest/globals': true,
  },

  extends: ['eslint:recommended', 'plugin:jest/recommended', 'airbnb-base'],

  rules: {
    'no-underscore-dangle': 0,
    'no-new': 0,
    'no-console': 0,
    'import/extensions': 0,
  },

  plugins: ['jest'],
};
