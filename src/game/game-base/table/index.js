function defaultKeyboard() {
  return [
    ['  ', '🌕', '  ', '🌕', '  ', '🌕', '  ', '🌕'],
    ['🌕', '  ', '🌕', '  ', '🌕', '  ', '🌕', '  '],
    ['  ', '🌕', '  ', '🌕', '  ', '🌕', '  ', '🌕'],
    ['|||', '  ', '|||', '  ', '|||', '  ', '|||', '  '],
    ['  ', '|||', '  ', '|||', '  ', '|||', '  ', '|||'],
    ['🌑', '  ', '🌑', '  ', '🌑', '  ', '🌑', '  '],
    ['  ', '🌑', '  ', '🌑', '  ', '🌑', '  ', '🌑'],
    ['🌑', '  ', '🌑', '  ', '🌑', '  ', '🌑', '  '],
  ];
}

class Table {
  constructor(game) {
    this.game = game;
    this.TABLE_SIZE = 8;
    this.keyboard = defaultKeyboard();
  }

  get symbols() { return this.game.symbols; }

  isCoordsValid(x, y) {
    return x >= 0 && x < this.TABLE_SIZE && y >= 0 && y < this.TABLE_SIZE;
  }

  getCell(x, y) { return this.isCoordsValid(x, y) ? this.keyboard[y][x] : null; }

  setCell(x, y, cell) { if (this.isCoordsValid(x, y)) this.keyboard[y][x] = cell; }

  // eslint-disable-next-line class-methods-use-this
  isWhiteCell(x, y) { return (y + x) % 2 === 0; }

  isBlackCell(x, y) { return this.getCell(x, y) === this.symbols.blackCell; }

  isPickedCell(x, y) { return this.getCell(x, y) === this.symbols.picked; }

  findFirstNonBlackCell(x, y, directionX, directionY) {
    let currentX = x;
    let currentY = y;

    while (this.isCoordsValid(currentX, currentY)) {
      currentX += directionX;
      currentY += directionY;
      if (!this.isBlackCell(currentX, currentY)) break;
    }
    return { x: currentX, y: currentY };
  }

  /**
   * @param {(x, y) => any} cb
   */
  forEachCell(cb) {
    for (let y = 0; y < this.TABLE_SIZE; y += 1) {
      for (let x = 0; x < this.TABLE_SIZE; x += 1) {
        cb(x, y);
      }
    }
  }

  createNewTable() {
    const keyboard = [];

    for (let y = 0; y < this.TABLE_SIZE; y += 1) {
      keyboard.push([]);
      for (let x = 0; x < this.TABLE_SIZE; x += 1) {
        if (this.isWhiteCell(x, y)) {
          keyboard[y].push(this.symbols.whiteCell);
        } else if (y < 3) {
          keyboard[y].push(this.symbols.whiteChecker);
        } else if (y > 4) {
          keyboard[y].push(this.symbols.blackChecker);
        } else {
          keyboard[y].push(this.symbols.blackCell);
        }
      }
    }

    this.keyboard = keyboard;
  }
}

module.exports = Table;
