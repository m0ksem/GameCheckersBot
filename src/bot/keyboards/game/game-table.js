const Markup = require('telegraf/markup');
const { action } = require('telegram-bot-action-handlers');

module.exports = (session, noAction) => {
  const inlineKeyboard = [];
  const { keyboard } = session.game.table;

  for (let y = 0; y < 8; y += 1) {
    inlineKeyboard.push([]);
    for (let x = 0; x < 8; x += 1) {
      const cbData = noAction ? action('no-action') : action('game/user-click', `${x}${y}`);
      inlineKeyboard[y].push(Markup.callbackButton(keyboard[y][x], cbData));
    }
  }

  inlineKeyboard.push([
    Markup.switchToChatButton(session.text.buttons.sendNewTable, ''),
    Markup.urlButton(session.text.buttons.visitTelegramChannel, 'https://t.me/m0ksembots'),
    Markup.urlButton(session.text.buttons.donate, 'https://www.patreon.com/m0ksem'),
  ]);

  return Markup.inlineKeyboard(inlineKeyboard);
};
