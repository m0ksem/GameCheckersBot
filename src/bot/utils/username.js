/**
 *  Returns user name from telegram context.
 * @returns {String} can be username, first_name or second_name.
 */
module.exports = function username(ctx) {
  return ctx.from.username || ctx.from.first_name || ctx.from.second_name;
};
