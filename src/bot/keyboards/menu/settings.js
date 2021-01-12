const Markup = require('telegraf/markup');
const Action = require('../../utils/action');

function renderBeatingRequiredTitle(session) {
  const beatIsRequiredHumanized = session.game.settings.beatIsRequired
    ? session.text.yes : session.text.no;

  return `${session.text.buttons.beatingRequired} ${beatIsRequiredHumanized}`;
}

module.exports = function startGameMenuKeyboard(session) {
  return Markup.inlineKeyboard([
    [Markup.callbackButton(session.text.buttons.switchLang, Action.stringify('menu/settings/change-language'))],
    [Markup.callbackButton(session.text.buttons.changeSkin, Action.stringify('menu/settings/change-skin'))],
    [Markup.callbackButton(renderBeatingRequiredTitle(session), Action.stringify('menu/settings/beating'))],
    [Markup.callbackButton(session.text.buttons.back, Action.stringify('menu/start-game'))],
  ]);
};
