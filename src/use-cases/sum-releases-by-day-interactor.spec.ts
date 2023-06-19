import DayJs from 'dayjs'
import { makeCreditRelease } from 'test/factories/make-credit-release'
import { makeDebitRelease } from 'test/factories/make-debit-release'
import { InMemoryCreditReleaseRepository } from 'test/repositories/in-memory-credit-release'
import { InMemoryDebitReleaseRepository } from 'test/repositories/in-memory-debit-release'
import { FindReleasesOfCreditByDayInteractor } from './find-releases-of-credit-by-day-interactor'
import { FindReleasesOfDebitByDayInteractor } from './find-releases-of-debit-by-day-interactor'
import { SumReleasesByDayInteractor } from './sum-releases-by-day-interactor'

let inMemoryDebitReleaseRepository: InMemoryDebitReleaseRepository
let inMemoryCreditReleaseRepository: InMemoryCreditReleaseRepository
let findReleasesOfCreditByDayInteractor: FindReleasesOfCreditByDayInteractor
let findReleasesOfDebitByDayInteractor: FindReleasesOfDebitByDayInteractor
let sut: SumReleasesByDayInteractor

describe('Release of Debit', () => {
  beforeEach(() => {
    inMemoryDebitReleaseRepository = new InMemoryDebitReleaseRepository()
    inMemoryCreditReleaseRepository = new InMemoryCreditReleaseRepository()

    findReleasesOfCreditByDayInteractor =
      new FindReleasesOfCreditByDayInteractor(inMemoryCreditReleaseRepository)
    findReleasesOfDebitByDayInteractor = new FindReleasesOfDebitByDayInteractor(
      inMemoryDebitReleaseRepository,
    )

    sut = new SumReleasesByDayInteractor(
      findReleasesOfCreditByDayInteractor,
      findReleasesOfDebitByDayInteractor,
    )
  })

  it('should be able to sum  releases of debit and credit by day', async () => {
    for (let i = 1; i <= 10; i++) {
      await inMemoryDebitReleaseRepository.create(
        makeDebitRelease({ amount: 1 }),
      )
    }

    for (let i = 1; i <= 11; i++) {
      await inMemoryCreditReleaseRepository.create(
        makeCreditRelease({ amount: 1 }),
      )
    }

    const { consolidateAmount, releases } = await sut.execute({
      findDay: DayJs().format('YYYY-MM-DD'),
    })

    expect(releases.length).toEqual(21)
    expect(consolidateAmount).toEqual(1)
  })
})
