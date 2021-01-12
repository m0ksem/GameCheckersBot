const Markup = require('telegraf/markup');
const Action = require('../../../utils/action');

const noAction = require('../../no-action');
const sessionExpiredAction = require('../../session-expired');

const sessionsStorage = require('../../../sessions-storage');
const skins = require('../../../../skins');

/** @param {GameSession} session */
function renderSkinListKeyboard(session) {
  const buttons = skins.map((skin) => {
    let title = session.text.skins[skin.name];
    if (session.skin.name === skin.name) { title = `✔ ${title}`; }

    return [Markup.callbackButton(
      title,
      Action.stringify('menu/settings/change-skin', skin.name),
    )];
  });

  buttons.push([Markup.callbackButton(session.text.buttons.back, 'menu/settings')]);
  return Markup.inlineKeyboard(buttons);
}

module.exports = (ctx, skinName) => {
  const session = sessionsStorage.find(ctx.callbackQuery.inline_message_id);
  if (!session) { return sessionExpiredAction(ctx); }

  if (skinName) {
    if (skinName === session.skin.name) return noAction(ctx);
    session.skin = skins.find((skin) => skin.name === skinName);
    session.game.table.createNewTable();
  }

  return ctx.editMessageCaption(session.text.captions.selectSkin, renderSkinListKeyboard(session));
};
