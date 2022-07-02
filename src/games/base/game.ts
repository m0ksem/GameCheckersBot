import { Grid, Table } from './table';
import { Hands } from './hands';
import { Turn } from './turn';

export abstract class Game {
  /** Override me */
  protected createGrid!: () => Grid

  turn: Turn = new Turn()
  hands = new Hands()
  table!: Table

  init() {
    this.table = new Table(this.createGrid())
  }
}