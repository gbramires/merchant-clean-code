import { DebitRelease } from '@/entities/debit-release'
import { ErrorResponse } from '@/entities/types/error'
import { knex } from '@/framework/database/connection'
import DayJs from 'dayjs'
import { IDebitReleaseRepository } from './types/debit-release-repository'

export class InMemoryDebitReleaseRepository implements IDebitReleaseRepository {
  async findManyByCreatedAt(findDay: string) {
    try {
      const debitRelease = (await knex('releases')).filter(
        (item) =>
          DayJs(item.createdAt).format('YYYY/MM/DD') ===
          DayJs(findDay).format('YYYY/MM/DD'),
      )

      return debitRelease
    } catch (err) {
      console.log(err)
      throw new ErrorResponse({
        error: JSON.stringify(`trace: ${err}`),
        statusCode: 503,
        message: 'Error to find releases of debit by day',
      })
    }
  }

  async create(debitRelease: DebitRelease) {
    try {
      await knex('releases').insert({
        _id: debitRelease._id,
        amount: debitRelease.amount,
        releaseName: debitRelease.releaseName,
        createdAt: debitRelease.createdAt,
        type: debitRelease.type,
      })
    } catch (err) {
      console.log(err)
      throw new ErrorResponse({
        error: JSON.stringify(`trace: ${err}`),
        statusCode: 503,
        message: 'Error to create release of debit',
      })
    }
  }
}
