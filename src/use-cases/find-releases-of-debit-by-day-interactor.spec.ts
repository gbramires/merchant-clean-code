import DayJs from 'dayjs'
import { makeDebitRelease } from 'test/factories/make-debit-release'
import { InMemoryDebitReleaseRepository } from 'test/repositories/in-memory-debit-release'
import { FindReleasesOfDebitByDayInteractor } from './find-releases-of-debit-by-day-interactor'

let inMemoryDebitReleaseRepository: InMemoryDebitReleaseRepository
let sut: FindReleasesOfDebitByDayInteractor

describe('Release of Debit', () => {
  beforeEach(() => {
    inMemoryDebitReleaseRepository = new InMemoryDebitReleaseRepository()
    sut = new FindReleasesOfDebitByDayInteractor(inMemoryDebitReleaseRepository)
  })

  it('should be able to find releases of debit by day', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryDebitReleaseRepository.create(
        makeDebitRelease({ amount: -100 }),
      )
    }

    const { debitReleases } = await sut.execute({
      findDay: DayJs().format('YYYY-MM-DD'),
    })

    expect(debitReleases.length).toEqual(22)
  })
})
