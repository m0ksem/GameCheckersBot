const noAction = require('../no-action');
const sessionExpiredAction = require('../session-expired');
const sessionsStorage = require('../../sessions-storage');
const startGameMenuKeyboard = require('../../keyboards/menu/start-game');
const username = require('../../../utils/username');
const config = require('../../../config');

const { allowSamePlayer } = config; // For development and testing

const enemy = (color) => (color === 'white' ? 'black' : 'white');

module.exports = (ctx, color) => {
  const session = sessionsStorage.find(ctx.callbackQuery.inline_message_id);
  if (!session) { return sessionExpiredAction(ctx); }

  const name = username(ctx);

  ctx.db.updateUser(ctx.from);

  if (session.players[color].name === name) return noAction(ctx);
  if (session.players[enemy(color)].name === name && !allowSamePlayer) {
    session.players[enemy(color)].name = undefined;
  }

  session.players[color].name = name;

  return ctx.editMessageCaption(
    session.text.captions.yourGameIsReady,
    startGameMenuKeyboard(session),
  );
};
