import { IDebitReleaseRepository } from '@/repositories/types/debit-release-repository'
import {
  IFindReleasesOfDebitUseCase,
  IFindReleasesOfDebitUseCaseRequest,
  IFindReleasesOfDebitUseCaseResponse,
} from './types/find-releases-of-debit-by-day-use-case'

export class FindReleasesOfDebitByDayInteractor
  implements IFindReleasesOfDebitUseCase
{
  constructor(private debitReleaseRepository: IDebitReleaseRepository) {}

  async execute({
    findDay,
  }: IFindReleasesOfDebitUseCaseRequest): Promise<IFindReleasesOfDebitUseCaseResponse> {
    const debitReleases = await this.debitReleaseRepository.findManyByCreatedAt(
      findDay,
    )

    return {
      debitReleases,
    }
  }
}
