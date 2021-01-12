const results = {
  whiteCell: { doNotUpdate: true, message: 'cantMove' },
  pickPicked: { doNotUpdate: true },
  checkerNotPicked: { doNotUpdate: true, message: 'checkerNotPicked' },
  checkerPicked: { },
  moveOnlyBlack: { doNotUpdate: true, message: 'onlyBlack' },
  moveToFar: { doNotUpdate: true, message: 'cantMove' },
  move: {},
  cantMove: { doNotUpdate: true, message: 'cantMove' },
  wrongDirection: { doNotUpdate: true, message: 'cantMove' },
  needToBeat: { doNotUpdate: true, message: 'beatRequired' },
  win: { doNotUpdate: true },
  lose: {},
  beat: { },
  cantChangePicked: { doNotUpdate: true, message: 'beatRequired' },
};

/**
 * @type {results}
 */
Object.keys(results).forEach((key) => { results[key].key = key; });

module.exports = results;
