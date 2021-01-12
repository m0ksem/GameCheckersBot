const sessionsStorage = require('../../sessions-storage');
const settingsKeyboard = require('../../keyboards/menu/settings');
const sessionExpiredAction = require('../session-expired');

module.exports = (ctx) => {
  const session = sessionsStorage.find(ctx.callbackQuery.inline_message_id);
  if (!session) { return sessionExpiredAction(ctx); }

  return ctx.editMessageCaption(session.text.captions.settings, settingsKeyboard(session));
};
