import { CreditRelease } from '@/entities/credit-release'

export interface ICreditReleaseRepository {
  findManyByCreatedAt(findDay: string): Promise<CreditRelease[]>
  create(creditRelease: CreditRelease): Promise<void>
}
