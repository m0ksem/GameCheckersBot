const sessionExpiredAction = require('../session-expired');
const sessionsStorage = require('../../sessions-storage');
const startGameMenuKeyboard = require('../../keyboards/menu/start-game');

function newSession(ctx) {
  const session = sessionsStorage.new(ctx.callbackQuery.inline_message_id);
  session.lang = ctx.from.language_code;
  return session;
}

function findSession(ctx) {
  return sessionsStorage.find(ctx.callbackQuery.inline_message_id);
}

module.exports = (ctx, isNew) => {
  const session = isNew ? newSession(ctx) : findSession(ctx);
  if (!session) { return sessionExpiredAction(ctx); }

  return ctx.editMessageCaption(
    session.text.captions.yourGameIsReady,
    startGameMenuKeyboard(session),
  );
};
