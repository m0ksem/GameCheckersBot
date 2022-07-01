export class Turn {
  players: Player[] = []
  
  private currentPlayerIndex: number = 0

  get currentPlayer() { return this.players[this.currentPlayerIndex] }
  get enemyPlayers() { return this.players.filter((p, i) => i !== this.currentPlayerIndex) }

  nextPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
  }
}