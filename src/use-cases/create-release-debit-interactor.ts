import { DebitRelease } from '@/entities/debit-release'
import { IDebitReleaseRepository } from '@/repositories/types/debit-release-repository'
import {
  ICreateReleaseDebitUseCase,
  IReleaseOfDebitUseCaseRequest,
  IReleaseOfDebitUseCaseResponse,
} from './types/create-release-debit-use-case'

export class CreateReleaseDebitInteractor
  implements ICreateReleaseDebitUseCase
{
  constructor(private debitReleaseRepository: IDebitReleaseRepository) {}

  async execute({
    amount,
    releaseName,
  }: IReleaseOfDebitUseCaseRequest): Promise<IReleaseOfDebitUseCaseResponse> {
    const debitRelease = DebitRelease.create({
      amount,
      releaseName,
    })

    await this.debitReleaseRepository.create(debitRelease)

    return {
      debitRelease,
    }
  }
}
