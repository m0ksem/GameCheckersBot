const Markup = require('telegraf/markup');
const dictionary = require('../../dictionary');

module.exports = (ctx) => {
  ctx.db.updateUser(ctx.from);

  const text = dictionary.text(ctx.from.language_code);

  const extra = {
    reply_markup: Markup.inlineKeyboard([
      Markup.switchToChatButton(text.buttons.sendNewTableToChat, ''),
    ]),
  };

  ctx.reply(text.captions.startText, extra);
};
