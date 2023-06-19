import { CreateReleaseCreditInteractor } from '@/use-cases/create-release-credit-interactor'
import { makeCreditRelease } from 'test/factories/make-credit-release'
import { InMemoryCreditReleaseRepository } from 'test/repositories/in-memory-credit-release'

let inMemoryCreditReleaseRepository: InMemoryCreditReleaseRepository
let sut: CreateReleaseCreditInteractor

describe('Release of Credit', () => {
  beforeEach(() => {
    inMemoryCreditReleaseRepository = new InMemoryCreditReleaseRepository()

    sut = new CreateReleaseCreditInteractor(inMemoryCreditReleaseRepository)
  })

  it('should be able to release credit', async () => {
    const creditRelease = makeCreditRelease()

    await inMemoryCreditReleaseRepository.create(creditRelease)

    await sut.execute({
      amount: creditRelease.amount,
      releaseName: creditRelease.releaseName,
    })

    expect(inMemoryCreditReleaseRepository.items[0].amount).toEqual(
      creditRelease.amount,
    )
  })
})
