class Turn {
  constructor(game) {
    this.game = game;
    this.isWhiteTurn = true;
  }

  get symbols() { return this.game.symbols; }

  get players() { return this.game.players; }

  /**
   * @returns {Player}
   */
  get currentPlayer() {
    const current = this.isWhiteTurn ? 'white' : 'black';
    return this.players[current];
  }

  get enemyPlayer() {
    const enemy = this.isWhiteTurn ? 'black' : 'white';
    return this.players[enemy];
  }

  get isWin() {
    return this.currentPlayer.checkersCount <= 0;
  }

  switch() {
    this.isWhiteTurn = !this.isWhiteTurn;
  }

  enemyKilled() {
    this.enemyPlayer.checkersCount -= 1;
  }
}

module.exports = Turn;
