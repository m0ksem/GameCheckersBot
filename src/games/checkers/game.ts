import { isDiagonal, Coordinate, coordinatesBetween, getNumberSign } from '../base/math'
import { Game } from '../base/game'

const NOTHING = -1
const WHITE_CELL = 0
const BLACK_CELL = 1
const PICKED_CELL = 2
const WHITE_CHECKER = 10
const WHITE_KING = 11
const BLACK_CHECKER = 20
const BLACK_KING = 21

const createGrid = () => ([
  [WHITE_CELL, WHITE_CHECKER, WHITE_CELL, WHITE_CHECKER, WHITE_CELL, WHITE_CHECKER, WHITE_CELL, WHITE_CHECKER],
  [WHITE_CHECKER, WHITE_CELL, WHITE_CHECKER, WHITE_CELL, WHITE_CHECKER, WHITE_CELL, WHITE_CHECKER, WHITE_CELL],
  [WHITE_CELL, WHITE_CHECKER, WHITE_CELL, WHITE_CHECKER, WHITE_CELL, WHITE_CHECKER, WHITE_CELL, WHITE_CHECKER],
  [BLACK_CELL, WHITE_CELL, BLACK_CELL, WHITE_CELL, BLACK_CELL, WHITE_CELL, BLACK_CELL, WHITE_CELL],
  [WHITE_CELL, BLACK_CELL, WHITE_CELL, BLACK_CELL, WHITE_CELL, BLACK_CELL, WHITE_CELL, BLACK_CELL],
  [BLACK_CHECKER, WHITE_CELL, BLACK_CHECKER, WHITE_CELL, BLACK_CHECKER, WHITE_CELL, BLACK_CHECKER, WHITE_CELL],
  [WHITE_CELL, BLACK_CHECKER, WHITE_CELL, BLACK_CHECKER, WHITE_CELL, BLACK_CHECKER, WHITE_CELL, BLACK_CHECKER],
  [BLACK_CHECKER, WHITE_CELL, BLACK_CHECKER, WHITE_CELL, BLACK_CHECKER, WHITE_CELL, BLACK_CHECKER, WHITE_CELL],
])

export class CheckersGame extends Game {
  constructor() {
    super()
    this.createGrid = createGrid
    this.init()

    this.turn.addPlayer(new Player(WHITE_CHECKER, WHITE_KING, 1))
    this.turn.addPlayer(new Player(BLACK_CHECKER, BLACK_KING, -1))
  }
  
  // Actions

  beatByChecker(from: Coordinate, to: Coordinate) {
    const isRangeTwo = Math.abs(from.x - to.y) === 2 && Math.abs(from.y - to.y) === 2
    if (!isRangeTwo) { return }

    const isCanBeat = this.isCanBeat(from, to)
    if (!isCanBeat) { return }

    this.table.swap(from, to)
    this.table.setCell(coordinatesBetween(from, to), BLACK_CELL)
    this.turn.enemyPlayer.checkersCount -= 1

    if (this.doSimpleCheckerNeedsToBeKing(to)) {
      this.table.setCell(to, this.turn.currentPlayer.kingSymbol)
    }

    if (this.doSimpleCheckerNeedToBeat(to)) {
      this.hands.isLocked = true
    } else {
      this.turn.nextPlayer()
      this.table.setCell(this.hands.pickedChecker!.position, this.hands.pickedChecker!.symbol)
    }
  }

  beatByKing(from: Coordinate, to: Coordinate) {
    const xDirection = getNumberSign(to.x - from.x)
    const yDirection = getNumberSign(to.x - from.y)
    const range = Math.abs(from.y - to.y)
  
    let enemyPosition: Coordinate | null = null
    for (let i = 1; i <= range; i += 1) {
      const x = from.x + i * xDirection
      const y = from.y + i * yDirection
      if (this.turn.enemyPlayer.isPlayerChecker(this.table.getCell({ x, y }) || NOTHING) && !enemyPosition) {
        enemyPosition = { x, y }
      } else if (this.table.getCell({ x, y }) !== BLACK_CELL) {
        return
      }
    }

    if (!enemyPosition) { return }

    this.table.swap(from, to)
    this.table.setCell(enemyPosition, BLACK_CELL)

    if (this.doSimpleCheckerNeedToBeat(to)) {
      this.hands.isLocked = true
    } else {
      this.turn.nextPlayer()
      this.table.setCell(this.hands.pickedChecker!.position, this.hands.pickedChecker!.symbol)
    }
  }

  beat(from: Coordinate, to: Coordinate) {
    const cell = this.table.getCell(from)!
    if (this.turn.currentPlayer.isPlayerSimpleChecker(cell)) {
      this.beatByChecker(from, to)
    } else if (this.turn.currentPlayer.isPlayerKing(cell)) {
      this.beatByKing(from, to)
    }
  }

  // Utils

  getNeedToBeatCheckers() {
    const needToBeat: Coordinate[] = []
    this.table.traverse((current) => {
      if (this.turn.currentPlayer.isPlayerSimpleChecker(current.cell)) {
        if (this.doSimpleCheckerNeedToBeat(current)) {
          needToBeat.push(current)
        }
      }

      if (this.turn.currentPlayer.isPlayerKing(current.cell)) {
        if (this.doKingNeedToBeat(current)) {
          needToBeat.push(current)
        }
      }
    })
    return needToBeat
  }

  // Rules
  isCanBeat(from: Coordinate, to: Coordinate) {
    const between = coordinatesBetween(from, to)
    const cellBetween = this.table.getCell(between)
    if (!cellBetween) { return false }
    const toCell = this.table.getCell(to)
    return this.turn.enemyPlayer.isPlayerChecker(cellBetween) && toCell === WHITE_CELL
  }

  isCorrectDirection(from: Coordinate, to: Coordinate) {
    return this.turn.currentPlayer.direction === getNumberSign(to.y - from.y)
  }

  doSimpleCheckerNeedsToBeKing(coord: Coordinate) {
    const endForPlayer = this.turn.currentPlayer.direction === 1 ? 7 : 0
    return endForPlayer === coord.y
  }

  doSimpleCheckerNeedToBeat(coord: Coordinate) {
    for (let yDirection = -1; yDirection <= 1; yDirection += 2) {
      for (let xDirection = -1; xDirection <= 1; xDirection += 2) {
        if (this.isCanBeat(coord, { x: coord.x + xDirection * 2, y: coord.y + yDirection * 2 })) { return true }
      }
    }
    return false
  }

  doKingNeedToBeat(coord: Coordinate) {
    for (let yDirection = -1; yDirection <= 1; yDirection += 2) {
      for (let xDirection = -1; xDirection <= 1; xDirection += 2) {
        const notBlackCell = this.table.findDirection(coord, { x: xDirection, y: yDirection }, ({ cell }) => cell !== BLACK_CELL)
        if (!notBlackCell) { continue }

        const isFirstNonBlackCellIsEnemy = this.turn.enemyPlayer.isPlayerChecker(notBlackCell.cell)
        const isCellBehindEnemyIsClear = this.table.getCell({ x: coord.x + xDirection, y: coord.y + yDirection}) === WHITE_CELL

        if (isFirstNonBlackCellIsEnemy && isCellBehindEnemyIsClear) return true
      }
    }
    return false
  }

  doNeedToBeat(coord: Coordinate) {
    const cell = this.table.getCell(coord)

    if (!cell) { return false }

    if (this.turn.currentPlayer.isPlayerSimpleChecker(cell)) {
      return this.doSimpleCheckerNeedToBeat(coord)
    }

    if (this.turn.currentPlayer.isPlayerKing(cell)) {
      return this.doKingNeedToBeat(coord)
    }

    return false
  }

  // Handlers

  handleClick(to: Coordinate) {
    const selectedCell = this.table.getCell(to)
    if (!selectedCell) { return }
    if (selectedCell === WHITE_CELL) { return /* Unable to interact with white cell */ }
    if (selectedCell === PICKED_CELL) { return /* Why do you need to click on picked cell? */ }

    if (!this.hands.pickedChecker) {
      if (this.turn.currentPlayer.isPlayerChecker(selectedCell)) {
        this.hands.pickedChecker = { position: to, symbol: selectedCell }
        return /* Checker picked */
      } else {
        return /* Need to pick a checker */
      }
    }

    if (selectedCell !== BLACK_CELL) { return /* Checker can move only on black cell */ }

    if (!isDiagonal(this.hands.pickedChecker.position, to)) { return /* Unable to move not by diagonal */}

    if (this.doNeedToBeat(to)) {
      this.beat(this.hands.pickedChecker.position, to)
    }

    this.table.swap(this.hands.pickedChecker.position, to)
  }
}