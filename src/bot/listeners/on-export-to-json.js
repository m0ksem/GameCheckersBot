const fs = require('fs');
const config = require('../../config');
const sessionStorage = require('../sessions-storage');
const sessionSerializer = require('../../database/serializers/game-session');

const FILE_PATH = './sessions.json';

module.exports = (ctx) => {
  if (ctx.from.id !== config.botAdmin) return ctx.reply('You must be m0ksem to use this command.');

  const json = JSON.stringify(sessionStorage.sessions.map((session) => sessionSerializer(session)));

  fs.writeFileSync(FILE_PATH, json);

  const file = fs.readFileSync(FILE_PATH);
  return ctx.telegram.sendDocument(ctx.from.id, {
    source: file,
    filename: FILE_PATH,
  });
};
