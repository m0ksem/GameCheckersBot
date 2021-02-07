const sessionStorage = require('../sessions-storage');
const sessionExpired = require('../actions/session-expired');

module.exports = (ctx) => {
  const session = sessionStorage.find(ctx.callbackQuery.inline_message_id);
  if (!session) { return sessionExpired(ctx); }

  return ctx.editMessageCaption(session.text.message.somethingWrong);
};
