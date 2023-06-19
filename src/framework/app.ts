import { ExpressReleaseControllerAdapter } from '@/adapters/express-release-controller-adapter'
import { ReleaseController } from '@/interfaces/release-controller'
import { InMemoryCreditReleaseRepository } from '@/repositories/in-memory-credit-release'
import { InMemoryDebitReleaseRepository } from '@/repositories/in-memory-debit-release'
import { CreateReleaseCreditInteractor } from '@/use-cases/create-release-credit-interactor'
import { CreateReleaseDebitInteractor } from '@/use-cases/create-release-debit-interactor'
import { FindReleasesOfCreditByDayInteractor } from '@/use-cases/find-releases-of-credit-by-day-interactor'
import { FindReleasesOfDebitByDayInteractor } from '@/use-cases/find-releases-of-debit-by-day-interactor'
import { SumReleasesByDayInteractor } from '@/use-cases/sum-releases-by-day-interactor'
import express from 'express'

const app = express()
app.use(express.json())

const debitReleaseRepository = new InMemoryDebitReleaseRepository()
const creditReleaseRepository = new InMemoryCreditReleaseRepository()

const createReleaseDebitInteractor = new CreateReleaseDebitInteractor(
  debitReleaseRepository,
)

const createReleaseCreditInteractor = new CreateReleaseCreditInteractor(
  creditReleaseRepository,
)

const findReleasesOfDebitByDayInteractor =
  new FindReleasesOfDebitByDayInteractor(debitReleaseRepository)

const findReleasesOfCreditByDayInteractor =
  new FindReleasesOfCreditByDayInteractor(creditReleaseRepository)

const sumReleasesByDayInteractor = new SumReleasesByDayInteractor(
  findReleasesOfCreditByDayInteractor,
  findReleasesOfDebitByDayInteractor,
)

const releaseController = new ReleaseController(
  createReleaseDebitInteractor,
  createReleaseCreditInteractor,
  sumReleasesByDayInteractor,
)

const expressReleaseControllerAdapter = new ExpressReleaseControllerAdapter(
  releaseController,
)

expressReleaseControllerAdapter.registerRoutes(app)

export { app }
