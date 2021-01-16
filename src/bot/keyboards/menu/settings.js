const Markup = require('telegraf/markup');
const { action } = require('telegram-bot-action-handlers');

function renderBeatingRequiredTitle(session) {
  const beatIsRequiredHumanized = session.game.settings.beatIsRequired
    ? session.text.yes : session.text.no;

  return `${session.text.buttons.beatingRequired} ${beatIsRequiredHumanized}`;
}

module.exports = function startGameMenuKeyboard(session) {
  return Markup.inlineKeyboard([
    [Markup.callbackButton(session.text.buttons.switchLang, action('menu/settings/change-language'))],
    [Markup.callbackButton(session.text.buttons.changeSkin, action('menu/settings/change-skin'))],
    [Markup.callbackButton(renderBeatingRequiredTitle(session), action('menu/settings/beating'))],
    [Markup.callbackButton(session.text.buttons.back, action('menu/start-game'))],
  ]);
};
