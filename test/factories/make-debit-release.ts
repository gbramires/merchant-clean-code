import { DebitRelease, DebitReleaseProps } from '@/entities/debit-release'
import { faker } from '@faker-js/faker'

export const makeDebitRelease = (override: Partial<DebitReleaseProps> = {}) => {
  const debit = DebitRelease.create({
    amount: Number(faker.commerce.price()),
    releaseName: faker.person.firstName(),
    ...override,
  })

  return debit
}
