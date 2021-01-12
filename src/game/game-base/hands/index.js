module.exports = class Hands {
  constructor(game) {
    this.game = game;
    this.table = game.table;
    this.turn = game.turn;

    this.pickedChecker = null;
  }

  get symbols() { return this.game.symbols; }

  get isPicked() { return !!this.pickedChecker; }

  get isPickedKing() {
    return this.isPicked && this.pickedChecker.checker === this.turn.currentPlayer.kingSymbol;
  }

  get isPickedSimpleChecker() {
    return this.isPicked && this.pickedChecker.checker === this.turn.currentPlayer.checkerSymbol;
  }

  get isPickedCheckerCanBeChanged() {
    return this.pickedChecker && this.pickedChecker.unchangeable;
  }

  clearCell(x, y) { this.table.setCell(x, y, this.symbols.blackCell); }

  placeChecker(x, y, checker) { this.table.setCell(x, y, checker); }

  placePicked(x, y) {
    this.clearCell(this.pickedChecker.x, this.pickedChecker.y);
    this.placeChecker(x, y, this.pickedChecker.checker);
    this.pickedChecker = null;
  }

  placePickedBack() {
    if (!this.isPicked) return;
    const { x, y } = this.pickedChecker;
    this.placePicked(x, y);
  }

  pickChecker(x, y) {
    if (this.pickedChecker && this.pickedChecker.unchangeable) return;

    const checker = this.table.getCell(x, y);
    this.placePickedBack();
    this.pickedChecker = { x, y, checker };
    this.table.setCell(x, y, this.symbols.picked);
  }

  movePicked(x, y) {
    this.clearCell(this.pickedChecker.x, this.pickedChecker.y);
    this.placeChecker(x, y, this.symbols.picked);
    this.pickedChecker.x = x;
    this.pickedChecker.y = y;
  }

  changePickedCheckerToKing() {
    this.pickedChecker.checker = this.turn.currentPlayer.kingSymbol;
  }

  setPickedUnchangeableByUser() {
    this.pickedChecker.unchangeable = true;
  }

  beat(fromX, fromY, toX, toY, enemyCoords) {
    const enemy = enemyCoords || {
      x: (fromX + toX) / 2,
      y: (fromY + toY) / 2,
    };
    this.clearCell(enemy.x, enemy.y);
    this.clearCell(fromX, fromY);
    this.movePicked(toX, toY);
  }
};
