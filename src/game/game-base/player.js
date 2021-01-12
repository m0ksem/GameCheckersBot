module.exports = class Player {
  constructor(checkerSymbol, kingSymbol, direction) {
    this.name = undefined;
    this.checkersCount = 12;
    this.checkerSymbol = checkerSymbol;
    this.kingSymbol = kingSymbol;
    this.direction = direction;
  }

  isPlayerChecker(symbol) {
    return symbol === this.checkerSymbol || symbol === this.kingSymbol;
  }

  isPlayerSimpleChecker(symbol) {
    return symbol === this.checkerSymbol;
  }

  isPlayerKing(symbol) {
    return symbol === this.kingSymbol;
  }
};
