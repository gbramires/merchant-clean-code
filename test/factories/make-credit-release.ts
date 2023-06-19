import { CreditRelease, CreditReleaseProps } from '@/entities/credit-release'
import { faker } from '@faker-js/faker'

export const makeCreditRelease = (
  override: Partial<CreditReleaseProps> = {},
) => {
  const credit = CreditRelease.create({
    amount: Number(faker.commerce.price()),
    releaseName: faker.person.firstName(),
    ...override,
  })

  return credit
}
