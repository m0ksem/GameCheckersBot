/* eslint-disable global-require */
const Action = require('../utils/action');

// TODO: replace with Dir entries recursive search.
const actions = {
  'no-action': require('../actions/no-action'),
  'menu/start-game': require('../actions/menu/start-game'),
  'menu/select-color': require('../actions/menu/select-color'),
  'menu/settings': require('../actions/menu/settings'),
  'menu/settings/change-skin': require('../actions/menu/settings/change-skin'),
  'menu/settings/change-language': require('../actions/menu/settings/change-language'),
  'menu/settings/beating': require('../actions/menu/settings/beating'),
  'game/start': require('../actions/game/start'),
  'game/user-click': require('../actions/game/user-click'),
};

module.exports = (ctx) => {
  const [actionName, actionData] = Action.parse(ctx.callbackQuery.data);

  const action = actions[actionName];

  console.log(actionName, actionData);

  if (action) { return action(ctx, actionData); }

  throw new Error(`Unknown action name ${actionName}`);
};
