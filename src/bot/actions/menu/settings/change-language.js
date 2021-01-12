const Markup = require('telegraf/markup');
const Action = require('../../../utils/action');

const noAction = require('../../no-action');
const sessionExpiredAction = require('../../session-expired');

const sessionsStorage = require('../../../sessions-storage');
const dictionary = require('../../../../dictionary');

/** @param {GameSession} session */
function renderLanguagesListKeyboard(session) {
  const buttons = Object.values(dictionary.langs).map((lang) => {
    const title = session.lang === lang.langCode ? `✔ ${lang.langName}` : lang.langName;
    const action = Action.stringify('menu/settings/change-language', lang.langCode);

    return [Markup.callbackButton(title, action)];
  });

  buttons.push([Markup.callbackButton(session.text.buttons.back, 'menu/settings')]);
  return Markup.inlineKeyboard(buttons);
}

module.exports = (ctx, langCode) => {
  const session = sessionsStorage.find(ctx.callbackQuery.inline_message_id);
  if (!session) { return sessionExpiredAction(ctx); }

  if (langCode) {
    if (langCode === session.lang) return noAction(ctx);
    session.lang = langCode;
  }

  return ctx.editMessageCaption(
    session.text.captions.selectLanguage,
    renderLanguagesListKeyboard(session),
  );
};
