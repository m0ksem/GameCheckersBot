/**
 * Module allow bot manipulate with actionName and actionData using
 * telegram callback data.
 */
module.exports = {
  SEPARATOR: ' | ',

  /**
   * Parse telegram callback data.
   * @param {String} cbData actionName and action_date separated by `SEPARATOR`
   * @returns [actionName, actionData]
   *
   * @see stringify method to create cbData.
   */
  parse(cbData) {
    return cbData.split(this.SEPARATOR);
  },

  /**
   * @param {String} actionName
   * @param {String} actionData
   *
   * @returns {String} of actionName and actionData separated by `SEPARATOR`
   *
   * @see parse
   */
  stringify(actionName, actionData) {
    return [actionName, actionData].join(this.SEPARATOR);
  },
};
