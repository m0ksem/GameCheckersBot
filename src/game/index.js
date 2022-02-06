const CheckersGameBase = require('./game-base');

const TURN_RESULTS = require('./game-base/turn/results');
const coordinates = require('./game-base/math/coordinates');

class Game extends CheckersGameBase {
  constructor(symbols) {
    super(symbols);
    this.settings = {
      beatIsRequired: true,
    };
  }

  isCanBeat(fromX, fromY, toX, toY) {
    const between = coordinates.coordinatesBetween(fromX, fromY, toX, toY);
    const isEnemyBetween = this.isEnemyChecker(between.x, between.y);
    return isEnemyBetween && this.table.isBlackCell(toX, toY);
  }

  isCorrectDirection(fromY, toY) {
    return this.turn.currentPlayer.direction === coordinates.getNumberSign(toY - fromY);
  }

  isPickedCheckerWhichNeedToBeat(needToBeatCheckers) {
    if (needToBeatCheckers.length === 0) return false;

    return !coordinates.isArrayIncludesCoords(needToBeatCheckers, this.hands.pickedChecker);
  }

  pickChecker(x, y) {
    if (!this.isCurrentPlayerChecker(x, y)) { return TURN_RESULTS.checkerNotPicked; }
    if (this.hands.isPickedCheckerCanBeChanged && this.settings.beatIsRequired) {
      return TURN_RESULTS.cantChangePicked;
    }

    this.hands.pickChecker(x, y);
    return TURN_RESULTS.checkerPicked;
  }

  beatBySimpleChecker(fromX, fromY, toX, toY) {
    const isRangeTwo = coordinates.isRangeTwo(fromX, fromY, toX, toY);
    const isCanBeat = this.isCanBeat(fromX, fromY, toX, toY);

    if (!isRangeTwo || !isCanBeat) {
      return TURN_RESULTS.needToBeat;
    }
    if (!isCanBeat) { return TURN_RESULTS.needToBeat; }

    this.hands.beat(fromX, fromY, toX, toY);
    this.turn.enemyKilled();

    if (this.isSimpleCheckerNeedsToBeKing(toX, toY)) {
      this.hands.changePickedCheckerToKing();
      if (this.isSimpleCheckerNeedToBeat(toX, toY)) {
        this.hands.setPickedUnchangeableByUser();
        return TURN_RESULTS.beat;
      }
    } else if (this.isSimpleCheckerNeedToBeat(toX, toY)) {
      this.hands.setPickedUnchangeableByUser();
      return TURN_RESULTS.beat;
    }

    this.hands.placePicked(toX, toY);
    this.turn.switch();
    return TURN_RESULTS.beat;
  }

  beatByKingV2(fromX, fromY, toX, toY) {
    const xDirection = coordinates.getNumberSign(toX - fromX);
    const yDirection = coordinates.getNumberSign(toY - fromY);
    const range = Math.abs(fromY - toY);
    let enemy = false;
    for (let i = 1; i <= range; i += 1) {
      const x = fromX + i * xDirection;
      const y = fromY + i * yDirection;
      if (this.isEnemyChecker(x, y) && !enemy) {
        enemy = { x, y };
      } else if (this.table.getCell(x, y) !== this.symbols.blackCell) {
        return TURN_RESULTS.cantMove;
      }
    }

    if (!enemy) return TURN_RESULTS.needToBeat;

    this.hands.beat(fromX, fromY, toX, toY, enemy);
    this.turn.enemyKilled();
    if (this.isKingNeedToBeat(toX, toY)) {
      this.hands.setPickedUnchangeableByUser();
      return TURN_RESULTS.beat;
    }

    this.hands.placePicked(toX, toY);
    this.turn.switch();
    return TURN_RESULTS.beat;
  }

  beatByKing(fromX, fromY, toX, toY) {
    if (this.isAnyObstacle(fromX, fromY, toX, toY)) { return TURN_RESULTS.cantMove; }

    const xSign = coordinates.getNumberSign(toX - fromX);
    const ySign = coordinates.getNumberSign(toY - fromY);
    const beatX = toX - 2 * xSign;
    const beatY = toY - 2 * ySign;
    const enemy = {
      x: toX - 1 * xSign,
      y: toY - 1 * ySign,
    };
    if (!this.isCanBeat(beatX, beatY, toX, toY)) { return TURN_RESULTS.cantMove; }

    this.hands.beat(fromX, fromY, toX, toY, enemy);
    this.turn.enemyKilled();
    if (this.isSimpleCheckerNeedToBeat(toX, toY)) {
      this.hands.setPickedUnchangeableByUser();
      return TURN_RESULTS.beat;
    }

    this.hands.placePicked(toX, toY);
    this.turn.switch();
    return TURN_RESULTS.beat;
  }

  beatByChecker(fromX, fromY, toX, toY) {
    if (this.hands.isPickedSimpleChecker) {
      return this.beatBySimpleChecker(fromX, fromY, toX, toY);
    }
    if (this.hands.isPickedKing) {
      return this.beatByKingV2(fromX, fromY, toX, toY);
    }
    return null;
  }

  moveSimpleChecker(fromX, fromY, toX, toY) {
    if (!this.isCorrectDirection(fromY, toY)) { return TURN_RESULTS.wrongDirection; }
    if (!coordinates.isRangeOne(fromX, fromY, toX, toY)) { return TURN_RESULTS.moveToFar; }
    if (this.isSimpleCheckerNeedsToBeKing(toX, toY)) { this.hands.changePickedCheckerToKing(); }

    this.hands.placePicked(toX, toY);
    this.turn.switch();
    return TURN_RESULTS.move;
  }

  moveKing(fromX, fromY, toX, toY) {
    if (this.isAnyObstacle(fromX, fromY, toX, toY)) { return TURN_RESULTS.moveToFar; }

    this.hands.placePicked(toX, toY);
    this.turn.switch();
    return TURN_RESULTS.move;
  }

  moveChecker(fromX, fromY, toX, toY) {
    if (this.hands.isPickedSimpleChecker) {
      return this.moveSimpleChecker(fromX, fromY, toX, toY);
    }
    if (this.hands.isPickedKing) {
      return this.moveKing(fromX, fromY, toX, toY);
    }
    return null;
  }

  isSimpleCheckerCanMoveAnyWhere(x, y) {
    const { direction } = this.turn.currentPlayer;
    return this.table.isBlackCell(x + 1, y + direction)
      || this.table.isBlackCell(x - 1, y + direction);
  }

  isKingCanMoveAnyWhere(x, y) {
    return this.table.isBlackCell(x + 1, y + 1)
      || this.table.isBlackCell(x - 1, y + 1)
      || this.table.isBlackCell(x + 1, y - 1)
      || this.table.isBlackCell(x - 1, y - 1);
  }

  isUserCanMove() {
    let cell;
    for (let y = 0; y < this.table.keyboard.length; y += 1) {
      const row = this.table.keyboard[y];
      for (let x = 0; x < row.length; x += 1) {
        cell = row[x];
        if (this.isCellCurrentPlayerSimpleChecker(cell)) {
          if (this.isSimpleCheckerCanMoveAnyWhere(x, y)) return true;
        }
        if (this.isCellCurrentPlayerKing(cell)) {
          if (this.isKingCanMoveAnyWhere(x, y)) return true;
        }
      }
    }
    return false;
  }

  whenBeatIsRequired(fromX, fromY, toX, toY) {
    const needToBeatCheckers = this.getNeedToBeatCheckers();
    const isNeedToBeat = needToBeatCheckers.length > 0;

    if (isNeedToBeat) {
      return this.beatByChecker(fromX, fromY, toX, toY);
    }

    return this.moveChecker(fromX, fromY, toX, toY);
  }

  whenBeatIsNotRequired(fromX, fromY, toX, toY) {
    const result = this.beatByChecker(fromX, fromY, toX, toY);
    if (result.key !== TURN_RESULTS.cantMove.key
      && result.key !== TURN_RESULTS.needToBeat.key) {
      return result;
    }

    return this.moveChecker(fromX, fromY, toX, toY);
  }

  userClick(x, y) {
    if (this.table.isWhiteCell(x, y)) return TURN_RESULTS.whiteCell;

    if (this.table.isPickedCell(x, y)) return TURN_RESULTS.pickPicked;

    if (!this.hands.isPicked || this.isCurrentPlayerChecker(x, y)) {
      return this.pickChecker(x, y);
    }

    if (!this.table.isBlackCell(x, y)) return TURN_RESULTS.moveOnlyBlack;

    if (!this.isUserCanMove()) return TURN_RESULTS.lose;

    const fromX = this.hands.pickedChecker.x;
    const fromY = this.hands.pickedChecker.y;

    if (!coordinates.isDiagonal(fromX, fromY, x, y)) { return TURN_RESULTS.cantMove; }

    if (this.settings.beatIsRequired) {
      return this.whenBeatIsRequired(fromX, fromY, x, y);
    }
    return this.whenBeatIsNotRequired(fromX, fromY, x, y);
  }
}

module.exports = Game;
