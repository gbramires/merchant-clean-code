import { DebitRelease } from '@/entities/debit-release'

export interface IDebitReleaseRepository {
  findManyByCreatedAt(findDay: string): Promise<DebitRelease[]>
  create(debitRelease: DebitRelease): Promise<void>
}
