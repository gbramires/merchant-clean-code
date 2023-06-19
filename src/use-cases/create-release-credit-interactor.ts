import { CreditRelease } from '@/entities/credit-release'
import { ICreditReleaseRepository } from '@/repositories/types/credit-release-repository'
import {
  ICreateReleaseCreditUseCase,
  IReleaseOfCreditUseCaseRequest,
  IReleaseOfCreditUseCaseResponse,
} from './types/create-release-credit-use-case'

export class CreateReleaseCreditInteractor
  implements ICreateReleaseCreditUseCase
{
  constructor(private creditReleaseRepository: ICreditReleaseRepository) {}

  async execute({
    amount,
    releaseName,
  }: IReleaseOfCreditUseCaseRequest): Promise<IReleaseOfCreditUseCaseResponse> {
    const creditRelease = CreditRelease.create({
      amount,
      releaseName,
    })

    await this.creditReleaseRepository.create(creditRelease)

    return {
      creditRelease,
    }
  }
}
