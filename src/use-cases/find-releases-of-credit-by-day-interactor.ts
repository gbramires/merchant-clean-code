import { ICreditReleaseRepository } from '@/repositories/types/credit-release-repository'
import {
  IFindReleasesOfCreditUseCase,
  IFindReleasesOfCreditUseCaseRequest,
  IFindReleasesOfCreditUseCaseResponse,
} from './types/find-releases-of-credit-by-day-use-case'

export class FindReleasesOfCreditByDayInteractor
  implements IFindReleasesOfCreditUseCase
{
  constructor(private creditReleaseRepository: ICreditReleaseRepository) {}

  async execute({
    findDay,
  }: IFindReleasesOfCreditUseCaseRequest): Promise<IFindReleasesOfCreditUseCaseResponse> {
    const creditReleases =
      await this.creditReleaseRepository.findManyByCreatedAt(findDay)

    return {
      creditReleases,
    }
  }
}
