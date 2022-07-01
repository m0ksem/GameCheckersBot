export class Turn {
  players: Player[] = []
  
  private currentPlayerIndex: number = 0

  get currentPlayer() { return this.players[this.currentPlayerIndex] }
  get enemyPlayer() { return this.players.filter((p, i) => i !== this.currentPlayerIndex)[0] }

  nextPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
  }

  addPlayer(p: Player) {
    this.players.push(p)
    return p
  }
}