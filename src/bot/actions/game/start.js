const sessionExpiredAction = require('../session-expired');
const sessionsStorage = require('../../sessions-storage');

const turnInfoCaption = require('../../captions/game/turn-info');
const gameTableKeyboard = require('../../keyboards/game/game-table');

module.exports = (ctx) => {
  const session = sessionsStorage.find(ctx.callbackQuery.inline_message_id);
  if (!session) { return sessionExpiredAction(ctx); }

  return ctx.editMessageCaption(
    turnInfoCaption(session),
    gameTableKeyboard(session),
  );
};
