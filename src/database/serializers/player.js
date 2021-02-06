module.exports = function serializePlayer(player) {
  return {
    name: player.name,
    checkersCount: player.checkersCount,
    checkerSymbol: player.checkerSymbol,
    kingSymbol: player.kingSymbol,
  };
};
