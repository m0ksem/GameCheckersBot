class Player {
  name?: string
  checkersCount: number
  checkerSymbol: string
  kingSymbol: string
  direction: -1 | 1

  constructor(checkerSymbol: string, kingSymbol: string, direction: -1 | 1) {
    this.name = undefined
    this.checkersCount = 12
    this.checkerSymbol = checkerSymbol
    this.kingSymbol = kingSymbol
    this.direction = direction
  }

  isPlayerChecker(symbol: string) {
    return symbol === this.checkerSymbol || symbol === this.kingSymbol
  }

  isPlayerSimpleChecker(symbol:  string) {
    return symbol === this.checkerSymbol
  }

  isPlayerKing(symbol: string) {
    return symbol === this.kingSymbol
  }
}