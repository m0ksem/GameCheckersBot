const Markup = require('telegraf/markup');
const Action = require('../../utils/action');

function isGameSessionReadyToPlay(session) {
  return session.players.white.name && session.players.black.name;
}

module.exports = function startGameMenuKeyboard(session) {
  const buttonsText = session.text.buttons;

  const whiteName = session.players.white.name || buttonsText.playAsWhite;
  const blackName = session.players.black.name || buttonsText.playAsBlack;

  const buttons = [
    [
      Markup.callbackButton(whiteName, Action.stringify('menu/select-color', 'white')),
      Markup.callbackButton(blackName, Action.stringify('menu/select-color', 'black')),
    ],
    [Markup.callbackButton(buttonsText.settings, Action.stringify('menu/settings'))],
  ];

  if (isGameSessionReadyToPlay(session)) {
    buttons.push([Markup.callbackButton(buttonsText.play, Action.stringify('game/start'))]);
  }

  return Markup.inlineKeyboard(buttons);
};
