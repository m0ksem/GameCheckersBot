const sessionStorage = require('../sessions-storage');
const sessionExpired = require('../actions/session-expired');

module.exports = (ctx) => {
  const sessionId = ctx.callbackQuery && ctx.callbackQuery.inline_message_id;
  if (!sessionId) { return ''; }

  const session = sessionStorage.find(sessionId);
  if (!session) { return sessionExpired(ctx); }

  return ctx.editMessageCaption(session.text.message.somethingWrong);
};
