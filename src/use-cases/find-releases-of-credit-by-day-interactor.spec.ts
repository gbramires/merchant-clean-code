import DayJs from 'dayjs'
import { makeCreditRelease } from 'test/factories/make-credit-release'
import { InMemoryCreditReleaseRepository } from 'test/repositories/in-memory-credit-release'
import { FindReleasesOfCreditByDayInteractor } from './find-releases-of-credit-by-day-interactor'

let inMemoryCreditReleaseRepository: InMemoryCreditReleaseRepository
let sut: FindReleasesOfCreditByDayInteractor

describe('Release of Credit', () => {
  beforeEach(() => {
    inMemoryCreditReleaseRepository = new InMemoryCreditReleaseRepository()
    sut = new FindReleasesOfCreditByDayInteractor(
      inMemoryCreditReleaseRepository,
    )
  })

  it('should be able to find releases of credit by day', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCreditReleaseRepository.create(
        makeCreditRelease({ amount: 100 }),
      )
    }

    const { creditReleases } = await sut.execute({
      findDay: DayJs().format('YYYY-MM-DD'),
    })

    expect(creditReleases.length).toEqual(22)
  })
})
