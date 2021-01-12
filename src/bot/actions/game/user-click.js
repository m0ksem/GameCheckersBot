const noAction = require('../no-action');
const showMessageAction = require('../show-message');
const sessionExpiredAction = require('../session-expired');
const showWinnerAction = require('./show-winner');

const sessionsStorage = require('../../sessions-storage');

const turnInfoCaption = require('../../captions/game/turn-info');
const gameTableKeyboard = require('../../keyboards/game/game-table');

module.exports = (ctx, cbData) => {
  const session = sessionsStorage.find(ctx.callbackQuery.inline_message_id);
  if (!session) { return sessionExpiredAction(ctx); }

  const [x, y] = cbData.split('').map((i) => parseInt(i, 10));

  const result = session.userClick(x, y);

  if (result.message) return showMessageAction(ctx, session.text.message[result.message]);

  if (!session.isUpdated) { return noAction(ctx); }

  if (session.winner) { return showWinnerAction(ctx, null, session); }

  ctx.editMessageCaption(
    turnInfoCaption(session),
    gameTableKeyboard(session),
  );

  if (result.status === 'Game end!') {
    sessionsStorage.remove(ctx.update.callback_query.inline_message_id);
  }

  return null;
};
