import DayJs from 'dayjs'
import { FindReleasesOfCreditByDayInteractor } from './find-releases-of-credit-by-day-interactor'
import { FindReleasesOfDebitByDayInteractor } from './find-releases-of-debit-by-day-interactor'
import {
  IReleaseWithType,
  ISumReleasesByDayUseCase,
  ISumReleasesByDayUseCaseRequest,
  ISumReleasesByDayUseCaseResponse,
} from './types/sum-releases-by-day-use-case'

export class SumReleasesByDayInteractor implements ISumReleasesByDayUseCase {
  constructor(
    private findReleasesOfCreditByDay: FindReleasesOfCreditByDayInteractor,
    private findReleasesOfDebitByDay: FindReleasesOfDebitByDayInteractor,
  ) {}

  async execute({
    findDay,
  }: ISumReleasesByDayUseCaseRequest): Promise<ISumReleasesByDayUseCaseResponse> {
    const { creditReleases } = await this.findReleasesOfCreditByDay.execute({
      findDay: DayJs(findDay).format('YYYY-MM-DD'),
    })

    const { debitReleases } = await this.findReleasesOfDebitByDay.execute({
      findDay: DayJs(findDay).format('YYYY-MM-DD'),
    })
    const releases: IReleaseWithType[] = [
      ...creditReleases,
      ...debitReleases,
    ].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

    const amountCredit = creditReleases.reduce(
      (acc, curr) => acc + curr.amount,
      0,
    )

    const amountDebit = debitReleases.reduce(
      (acc, curr) => acc + curr.amount,
      0,
    )

    const consolidateAmount = amountCredit + amountDebit * -1

    return {
      releases,
      consolidateAmount,
    }
  }
}
