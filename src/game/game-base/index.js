const Table = require('./table');
const Turn = require('./turn');
const Hands = require('./hands');
const Player = require('./player');
const coordinates = require('./math/coordinates');

module.exports = class CheckersGameBase {
  constructor(symbols) {
    this.private = { symbols };

    this.table = new Table(this);
    this.turn = new Turn(this);
    this.hands = new Hands(this);

    this.players = {
      white: new Player(this.symbols.whiteChecker, this.symbols.whiteKing, 1),
      black: new Player(this.symbols.blackChecker, this.symbols.blackKing, -1),
    };

    this.symbols = symbols;
  }

  get symbols() { return this.private.symbols; }

  set symbols(symbols) {
    this.private.symbols = symbols;

    this.players.white.checkerSymbol = this.symbols.whiteChecker;
    this.players.white.kingSymbol = this.symbols.whiteKing;
    this.players.black.checkerSymbol = this.symbols.blackChecker;
    this.players.black.kingSymbol = this.symbols.blackKing;
  }

  isCurrentPlayerChecker(x, y) {
    const checker = this.table.getCell(x, y);
    return this.turn.currentPlayer.isPlayerChecker(checker);
  }

  isEnemyChecker(x, y) {
    const checker = this.table.getCell(x, y);
    return this.turn.enemyPlayer.isPlayerChecker(checker);
  }

  isCellCurrentPlayerSimpleChecker(cell) {
    if (this.turn.currentPlayer.isPlayerSimpleChecker(cell)) return true;
    if (cell === this.symbols.picked) return this.hands.isPickedSimpleChecker;
    return false;
  }

  isCellCurrentPlayerKing(cell) {
    if (this.turn.currentPlayer.isPlayerKing(cell)) return true;
    if (cell === this.symbols.picked) return this.hands.isPickedKing;
    return false;
  }

  getNeedToBeatCheckers() {
    const needToBeatCheckers = [];
    this.table.forEachCell((x, y) => {
      if (this.table.isWhiteCell(x, y)) return;

      const cell = this.table.getCell(x, y);

      if (this.isCellCurrentPlayerSimpleChecker(cell)) {
        if (this.isSimpleCheckerNeedToBeat(x, y)) { needToBeatCheckers.push({ y, x }); }
      }

      if (this.isCellCurrentPlayerKing(cell)) {
        if (this.isKingNeedToBeat(x, y)) { needToBeatCheckers.push({ y, x }); }
      }
    });

    return needToBeatCheckers;
  }

  isAnyObstacle(fromX, fromY, toX, toY) {
    const xDirection = coordinates.getNumberSign(toX - fromX);
    const yDirection = coordinates.getNumberSign(toY - fromY);
    const range = Math.abs(fromY - toY) - 2;
    for (let i = 1; i <= range; i += 1) {
      const x = fromX + i * xDirection;
      const y = fromY + i * yDirection;
      if (this.table.getCell(x, y) !== this.symbols.blackCell) { return true; }
    }
    return false;
  }

  isSimpleCheckerNeedsToBeKing(x, y) {
    const endForPlayer = this.turn.currentPlayer.direction === 1 ? 7 : 0;
    return endForPlayer === y;
  }

  isSimpleCheckerNeedToBeat(x, y) {
    for (let yDirection = -1; yDirection <= 1; yDirection += 2) {
      for (let xDirection = -1; xDirection <= 1; xDirection += 2) {
        if (this.isCanBeat(x, y, x + xDirection * 2, y + yDirection * 2)) { return true; }
      }
    }
    return false;
  }

  isKingNeedToBeat(kingX, kingY) {
    for (let yDirection = -1; yDirection <= 1; yDirection += 2) {
      for (let xDirection = -1; xDirection <= 1; xDirection += 2) {
        const { x, y } = this.table.findFirstNonBlackCell(kingX, kingY, xDirection, yDirection);

        const isFirstNonBlackCellIsEnemy = this.isEnemyChecker(x, y);
        const isCellBehindEnemyIsClear = this.table.isBlackCell(x + xDirection, y + yDirection);

        if (isFirstNonBlackCellIsEnemy && isCellBehindEnemyIsClear) return true;
      }
    }
    return false;
  }
};
