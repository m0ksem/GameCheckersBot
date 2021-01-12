const sessionExpiredAction = require('../../session-expired');

const sessionsStorage = require('../../../sessions-storage');
const settingsKeyboard = require('../../../keyboards/menu/settings');

module.exports = (ctx) => {
  const session = sessionsStorage.find(ctx.callbackQuery.inline_message_id);
  if (!session) { return sessionExpiredAction(ctx); }

  session.game.settings.beatIsRequired = !session.game.settings.beatIsRequired;
  return ctx.editMessageCaption(session.text.captions.settings, settingsKeyboard(session));
};
