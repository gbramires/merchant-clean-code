import { makeDebitRelease } from 'test/factories/make-debit-release'
import { InMemoryDebitReleaseRepository } from 'test/repositories/in-memory-debit-release'
import { CreateReleaseDebitInteractor } from './create-release-debit-interactor'

let inMemoryDebitReleaseRepository: InMemoryDebitReleaseRepository
let sut: CreateReleaseDebitInteractor

describe('Release of Debit', () => {
  beforeEach(() => {
    inMemoryDebitReleaseRepository = new InMemoryDebitReleaseRepository()

    sut = new CreateReleaseDebitInteractor(inMemoryDebitReleaseRepository)
  })

  it('should be able to release debit', async () => {
    const debitRelease = makeDebitRelease()

    await inMemoryDebitReleaseRepository.create(debitRelease)

    await sut.execute({
      amount: debitRelease.amount,
      releaseName: debitRelease.releaseName,
    })

    expect(inMemoryDebitReleaseRepository.items[0].amount).toEqual(
      debitRelease.amount,
    )
  })
})
