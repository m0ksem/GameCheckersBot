class Player {
  name?: string
  checkersCount: number
  checkerSymbol: number
  kingSymbol: number
  direction: -1 | 1

  constructor(checkerSymbol: number, kingSymbol: number, direction: -1 | 1) {
    this.name = undefined
    this.checkersCount = 12
    this.checkerSymbol = checkerSymbol
    this.kingSymbol = kingSymbol
    this.direction = direction
  }

  isPlayerChecker(symbol: number) {
    return symbol === this.checkerSymbol || symbol === this.kingSymbol
  }

  isPlayerSimpleChecker(symbol:  number) {
    return symbol === this.checkerSymbol
  }

  isPlayerKing(symbol: number) {
    return symbol === this.kingSymbol
  }
}