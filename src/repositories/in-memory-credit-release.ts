import { CreditRelease } from '@/entities/credit-release'
import { ErrorResponse } from '@/entities/types/error'
import { knex } from '@/framework/database/connection'
import DayJs from 'dayjs'
import { ICreditReleaseRepository } from './types/credit-release-repository'

export class InMemoryCreditReleaseRepository
  implements ICreditReleaseRepository
{
  async findManyByCreatedAt(findDay: string) {
    try {
      const creditRelease = (await knex('releases')).filter(
        (item) =>
          DayJs(item.createdAt).format('YYYY/MM/DD') ===
          DayJs(findDay).format('YYYY/MM/DD'),
      )

      return creditRelease
    } catch (err) {
      console.log(err)
      throw new ErrorResponse({
        error: JSON.stringify(`trace: ${err}`),
        statusCode: 503,
        message: 'Error to find releases of credit by day',
      })
    }
  }

  async create(creditRelease: CreditRelease) {
    try {
      await knex('releases').insert({
        _id: creditRelease._id,
        amount: creditRelease.amount,
        releaseName: creditRelease.releaseName,
        createdAt: creditRelease.createdAt,
        type: creditRelease.type,
      })
    } catch (err) {
      console.log(err)
      throw new ErrorResponse({
        error: JSON.stringify(`trace: ${err}`),
        statusCode: 503,
        message: 'Error to create release of credit',
      })
    }
  }
}
