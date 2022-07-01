type Grid = string[][]

class Table {
  grid: Grid

  constructor(grid: Grid) {
    this.grid = grid
  }

  getCell(x: number, y: number) { return this.grid[y][x] || null }

  setCell(x: number, y: number, value: string) { this.grid[y][x] && (this.grid[y][x] = value) }

  traverse(cb: (x: number, y: number) => void) {
    for (let y = 0; y < this.grid.length; y += 1) {
      for (let x = 0; x < this.grid[y].length; x += 1) {
        cb(x, y)
      }
    }
  }
}