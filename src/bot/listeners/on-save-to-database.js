const config = require('../../config');
const sessionStorage = require('../sessions-storage');

module.exports = async (ctx, db) => {
  if (ctx.from.id !== Number(config.botAdmin)) return ctx.reply('You must be m0ksem to access this command.');

  const result = await db.saveSessions(sessionStorage.sessions);

  return ctx.reply(result);
};
