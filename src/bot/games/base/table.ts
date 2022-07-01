import { Coordinate } from './math/coordinates'

export type Cell = number 
export type Grid = Cell[][]

export class Table {
  grid: Grid

  constructor(grid: Grid) {
    this.grid = grid
  }

  getCell(coord: Coordinate) { return this.grid[coord.y][coord.x] || null }

  setCell(coord: Coordinate, value: Cell) { this.grid[coord.y][coord.x] && (this.grid[coord.y][coord.x] = value) }

  traverse(cb: (a: Coordinate & { cell: Cell }) => void) {
    for (let y = 0; y < this.grid.length; y += 1) {
      for (let x = 0; x < this.grid[y].length; x += 1) {
        cb({ x, y, cell: this.grid[y][x] })
      }
    }
  }

  findDirection(from: Coordinate, direction: Coordinate, cb: (a: Coordinate & { cell: Cell }) => boolean | undefined) {
    let coord = { x: from.x + direction.x, y: from.y + direction.y }
    while (true) {
      const cell = this.getCell(coord)
      if (!cell) { break }
      const res = cb({ ...coord, cell })
      if (res) { return { ...coord, cell } }
      coord = { x: coord.x + direction.x, y: coord.y + direction.y }
    }
  }

  swap(from: Coordinate, to: Coordinate) {
    const cellFrom = this.getCell(from)
    const cellTo = this.getCell(to)

    if (!cellFrom || !cellTo) { return }
    this.setCell(from, cellTo)
    this.setCell(to, cellFrom)
  }
}