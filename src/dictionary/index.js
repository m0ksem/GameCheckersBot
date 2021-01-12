const ru = require('./langs/ru');
const en = require('./langs/en');

module.exports = {
  DEFAULT_LANGUAGE_CODE: 'en',

  langs: {
    en, ru,
  },

  text(languageCode) {
    if (!Object.keys(this.langs).includes(languageCode)) {
      return this.langs[this.DEFAULT_LANGUAGE_CODE];
    }

    return this.langs[languageCode];
  },
};
