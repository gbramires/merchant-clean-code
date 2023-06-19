import { DebitRelease } from '@/entities/debit-release'
import { IDebitReleaseRepository } from '@/repositories/types/debit-release-repository'
import DayJs from 'dayjs'

export class InMemoryDebitReleaseRepository implements IDebitReleaseRepository {
  public items: DebitRelease[] = []

  async findManyByCreatedAt(findDay: string) {
    const debitRelease = this.items.filter(
      (item) =>
        DayJs(item.createdAt).format('YYYY/MM/DD') ===
        DayJs(findDay).format('YYYY/MM/DD'),
    )

    return debitRelease
  }

  async create(debitRelease: DebitRelease) {
    this.items.push(debitRelease)
  }
}
