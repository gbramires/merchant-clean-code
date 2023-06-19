import { CreditRelease } from '@/entities/credit-release'
import { ICreditReleaseRepository } from '@/repositories/types/credit-release-repository'
import DayJs from 'dayjs'

export class InMemoryCreditReleaseRepository
  implements ICreditReleaseRepository
{
  public items: CreditRelease[] = []

  async findManyByCreatedAt(findDay: string) {
    const creditRelease = this.items.filter(
      (item) =>
        DayJs(item.createdAt).format('YYYY/MM/DD') ===
        DayJs(findDay).format('YYYY/MM/DD'),
    )

    return creditRelease
  }

  async create(creditRelease: CreditRelease) {
    this.items.push(creditRelease)
  }
}
