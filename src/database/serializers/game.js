module.exports = function serializeGame(game) {
  return {
    table: {
      keyboard: game.table.keyboard,
    },
    turn: {
      isWhiteTurn: game.turn.isWhiteTurn,
    },
    hands: {
      pickedChecker: game.hands.pickedChecker,
    },
  };
};
