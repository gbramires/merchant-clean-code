import { CreditRelease } from '@/entities/credit-release'

export interface IReleaseOfCreditUseCaseRequest {
  amount: number
  releaseName: string
}

export interface IReleaseOfCreditUseCaseResponse {
  creditRelease: CreditRelease
}

export interface ICreateReleaseCreditUseCase {
  execute(
    data: IReleaseOfCreditUseCaseRequest,
  ): Promise<IReleaseOfCreditUseCaseResponse>
}
