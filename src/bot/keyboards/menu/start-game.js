const Markup = require('telegraf/markup');
const { action } = require('telegram-bot-action-handlers');

function isGameSessionReadyToPlay(session) {
  return session.players.white.name && session.players.black.name;
}

module.exports = function startGameMenuKeyboard(session) {
  const buttonsText = session.text.buttons;

  const whiteName = session.players.white.name || buttonsText.playAsWhite;
  const blackName = session.players.black.name || buttonsText.playAsBlack;

  const buttons = [
    [
      Markup.callbackButton(whiteName, action('menu/select-color', 'white')),
      Markup.callbackButton(blackName, action('menu/select-color', 'black')),
    ],
    [Markup.callbackButton(buttonsText.settings, action('menu/settings'))],
  ];

  if (isGameSessionReadyToPlay(session)) {
    buttons.push([Markup.callbackButton(buttonsText.play, action('game/start'))]);
  }

  return Markup.inlineKeyboard(buttons);
};
