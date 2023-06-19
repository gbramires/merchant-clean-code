import { ReleaseProps } from '@/entities/types/release'

export interface ISumReleasesByDayUseCaseRequest {
  findDay: string
}

export interface IReleaseWithType extends ReleaseProps {
  type: 'credit' | 'debit'
}

export interface ISumReleasesByDayUseCaseResponse {
  releases: IReleaseWithType[]
  consolidateAmount: number
}

export interface ISumReleasesByDayUseCase {
  execute(
    data: ISumReleasesByDayUseCaseRequest,
  ): Promise<ISumReleasesByDayUseCaseResponse>
}
