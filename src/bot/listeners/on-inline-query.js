const Markup = require('telegraf/markup');
const Action = require('../utils/action');
const dictionary = require('../../dictionary');

module.exports = (ctx) => {
  const text = dictionary.text(ctx.from.language_code);

  return ctx.answerInlineQuery([
    {
      type: 'article',
      id: 1,
      title: text.captions.sendTable,
      description: text.captions.sendTableDescription,
      message_text: text.captions.yourGameIsReady,
      reply_markup: Markup.inlineKeyboard([
        Markup.callbackButton(
          text.buttons.clickToStart,
          Action.stringify('menu/start-game', 'new'),
        ),
      ]),
    },
  ]);
};
