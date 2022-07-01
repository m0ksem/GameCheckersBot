type PickedChecker = {
  x: number,
  y: number,
  symbol: string,
}

export class Hands {
  pickedChecker: PickedChecker | null = null
}