import { DebitRelease } from '@/entities/debit-release'

export interface IReleaseOfDebitUseCaseRequest {
  amount: number
  releaseName: string
}

export interface IReleaseOfDebitUseCaseResponse {
  debitRelease: DebitRelease
}

export interface ICreateReleaseDebitUseCase {
  execute(
    data: IReleaseOfDebitUseCaseRequest,
  ): Promise<IReleaseOfDebitUseCaseResponse>
}
