import { Coordinate } from '../base/math/coordinates';
type PickedChecker = {
  position: Coordinate,
  symbol: number,
}

export class Hands {
  pickedChecker: PickedChecker | null = null

  isLocked: boolean = false

  pick(coord: Coordinate) {

  }
}