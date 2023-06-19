import { DebitRelease } from '@/entities/debit-release'

export interface IFindReleasesOfDebitUseCaseRequest {
  findDay: string
}

export interface IFindReleasesOfDebitUseCaseResponse {
  debitReleases: DebitRelease[]
}

export interface IFindReleasesOfDebitUseCase {
  execute(
    data: IFindReleasesOfDebitUseCaseRequest,
  ): Promise<IFindReleasesOfDebitUseCaseResponse>
}
