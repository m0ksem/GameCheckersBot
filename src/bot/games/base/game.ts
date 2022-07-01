import { Hands } from './hands';
import { Turn } from './turn';

export abstract class Game {
  /** Override me */
  createTable = () => [[]]

  turn: Turn = new Turn()
  hands = new Hands()
  table = new Table(this.createTable())
}