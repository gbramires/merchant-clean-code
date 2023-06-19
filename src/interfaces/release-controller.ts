import { ErrorResponse } from '@/entities/types/error'
import { CreateReleaseCreditInteractor } from '@/use-cases/create-release-credit-interactor'
import { CreateReleaseDebitInteractor } from '@/use-cases/create-release-debit-interactor'
import { SumReleasesByDayInteractor } from '@/use-cases/sum-releases-by-day-interactor'
import DayJs from 'dayjs'
import { Request, Response } from 'express'
import { releaseSchema } from './release-schema'

export class ReleaseController {
  constructor(
    private readonly createReleaseDebitInteractor: CreateReleaseDebitInteractor,
    private readonly createReleaseCreditInteractor: CreateReleaseCreditInteractor,
    private readonly sumReleaseByDayInteractor: SumReleasesByDayInteractor,
  ) {}

  async createReleaseDebit(req: Request, res: Response): Promise<void> {
    try {
      const validation = releaseSchema.createReleaseValidation.validate(
        req.body,
      )

      if (validation.error) {
        res.status(400).json({ error: validation.error.message })
        return
      }

      const { releaseName, amount } = req.body

      const { debitRelease } = await this.createReleaseDebitInteractor.execute({
        releaseName,
        amount,
      })

      res.status(201).json({ debitRelease })
    } catch (error) {
      if (error instanceof ErrorResponse) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  async createReleaseCredit(req: Request, res: Response): Promise<void> {
    try {
      const validation = releaseSchema.createReleaseValidation.validate(
        req.body,
      )

      if (validation.error) {
        res.status(400).json({ error: validation.error.message })
        return
      }

      const { releaseName, amount } = req.body

      const { creditRelease } =
        await this.createReleaseCreditInteractor.execute({
          releaseName,
          amount,
        })

      res.status(201).json({ creditRelease })
    } catch (error) {
      if (error instanceof ErrorResponse) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  async consolidateAmountByDay(req: Request, res: Response): Promise<void> {
    try {
      const validation = releaseSchema.consolidateAmountValidation.validate(
        req.query,
      )

      if (validation.error) {
        res.status(400).json({ error: validation.error.message })
        return
      }

      const { day } = req.query

      const { consolidateAmount, releases } =
        await this.sumReleaseByDayInteractor.execute({
          findDay: DayJs(String(day)).format('YYYY/MM/DD'),
        })

      res.status(200).json({ consolidateAmount, releases })
    } catch (error) {
      if (error instanceof ErrorResponse) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }
}
