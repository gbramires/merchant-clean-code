import { faker } from '@faker-js/faker'

interface IBodyCreateRelease {
  amount: number
  releaseName: string
}

interface IBodyCreateResponse {
  body: {
    amount: number
    releaseName: string
  }
}

export const makeBodyCreateRelease = (
  override: Partial<IBodyCreateRelease> = {},
): IBodyCreateResponse => {
  const body = {
    amount: Number(faker.commerce.price()),
    releaseName: faker.person.firstName(),
    ...override,
  }

  return { body }
}
