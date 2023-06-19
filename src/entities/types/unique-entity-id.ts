import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private value: string

  toValue() {
    return this.value
  }

  constructor() {
    this.value = randomUUID()
  }
}
