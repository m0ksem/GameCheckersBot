const { getHandlerFunctions, callbackQueryDataToAction } = require('telegram-bot-action-handlers');
const config = require('../../config');

const actionHandlers = getHandlerFunctions('../actions');

module.exports = (ctx) => {
  const { actionData, actionName } = callbackQueryDataToAction(ctx.callbackQuery.data);

  if (config.env === 'development') { console.log({ actionName, actionData }); }

  const handler = actionHandlers[actionName];

  if (handler) { return handler(ctx, actionData); }

  throw new Error(`Unknown action name ${actionName}`);
};
