import { CreditRelease } from '@/entities/credit-release'

export interface IFindReleasesOfCreditUseCaseRequest {
  findDay: string
}

export interface IFindReleasesOfCreditUseCaseResponse {
  creditReleases: CreditRelease[]
}

export interface IFindReleasesOfCreditUseCase {
  execute(
    data: IFindReleasesOfCreditUseCaseRequest,
  ): Promise<IFindReleasesOfCreditUseCaseResponse>
}
