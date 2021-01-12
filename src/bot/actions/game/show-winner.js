const gameTableKeyboard = require('../../keyboards/game/game-table');
const sessionExpiredAction = require('../session-expired');
const sessionsStorage = require('../../sessions-storage');

function renderWinnerMessage(session) {
  const header = `${session.winner.name} won this game!`;
  const footer = '';
  return [header, '', footer].join('\n');
}

module.exports = (ctx, data, session) => {
  let ses = session;
  if (!ses) {
    ses = sessionsStorage.find(ctx.callbackQuery.inline_message_id);
    if (!ses) { return sessionExpiredAction(ctx); }
  }

  return ctx.editMessageCaption(renderWinnerMessage(ses), gameTableKeyboard(ses, true));
};
