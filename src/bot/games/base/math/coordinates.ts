export type Coordinate = { x: number, y: number }

export const isDiagonal = (from: Coordinate, to: Coordinate) => Math.abs(from.x - to.x) === Math.abs(from.y - to.y)

export const coordinatesBetween = (from: Coordinate, to: Coordinate) => ({
  x: ((to.x + from.x) / 2).toFixed(),
  y: ((to.y + from.y) / 2).toFixed(),
})

export const areCoordinatesEqual = (coords1: Coordinate, coords2: Coordinate) => coords1.x === coords2.x && coords1.y === coords2.y

export const isArrayIncludesCoords = (array: Coordinate[], coords: Coordinate) => {
  for (let i = 0; i < array.length; i += 1) {
    const arrayCoords = array[i];
    if (areCoordinatesEqual(arrayCoords, coords)) { return true; }
  }
  return false;
}

export const getNumberSign = (number: number) => {
  return Math.abs(number) / number;
}