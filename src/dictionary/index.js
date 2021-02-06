const fs = require('fs');
const mergeDeep = require('../utils/object-merge');

const DEFAULT_LANGUAGE_CODE = 'en';

function normalizePath(path) {
  return `${__dirname}/${path}`;
}

function readLangs(folder, defaultLangCode) {
  const filePaths = fs.readdirSync(folder);

  const langsArray = filePaths.map((filePath) => {
    const json = fs.readFileSync(`${folder}/${filePath}`);
    return JSON.parse(json);
  });

  const defaultLang = langsArray.find((lang) => lang.langCode === defaultLangCode);
  const langs = {};

  langsArray.forEach((lang) => { langs[lang.langCode] = mergeDeep(lang, defaultLang); });

  return langs;
}

module.exports = {
  langs: readLangs(normalizePath('./langs'), DEFAULT_LANGUAGE_CODE),

  text(languageCode) {
    if (!Object.keys(this.langs).includes(languageCode)) {
      return this.langs[DEFAULT_LANGUAGE_CODE];
    }

    return this.langs[languageCode];
  },
};
