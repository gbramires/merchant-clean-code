import { ExpressReleaseControllerAdapter } from '@/adapters/express-release-controller-adapter'
import { ReleaseController } from '@/interfaces/release-controller'
import { CreateReleaseCreditInteractor } from '@/use-cases/create-release-credit-interactor'
import { CreateReleaseDebitInteractor } from '@/use-cases/create-release-debit-interactor'
import { FindReleasesOfCreditByDayInteractor } from '@/use-cases/find-releases-of-credit-by-day-interactor'
import { FindReleasesOfDebitByDayInteractor } from '@/use-cases/find-releases-of-debit-by-day-interactor'
import { SumReleasesByDayInteractor } from '@/use-cases/sum-releases-by-day-interactor'
import DayJs from 'dayjs'
import express from 'express'
import request from 'supertest'
import { InMemoryCreditReleaseRepository } from 'test/repositories/in-memory-credit-release'
import { InMemoryDebitReleaseRepository } from 'test/repositories/in-memory-debit-release'

describe('ExpressReleaseControllerAdapter', () => {
  const app = express()
  beforeAll(() => {
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
  })

  it('should register POST /releases/credit route', async () => {
    const response = await request(app)
      .post('/release/credit')
      .send({ releaseName: 'test', amount: 100 })

    expect(response.status).toBe(201)
    expect(response.body.creditRelease.props._id).toBeDefined()
    expect(response.body.creditRelease.props.type).toEqual('credit')
    expect(response.body.creditRelease.props.releaseName).toEqual('test')
    expect(response.body.creditRelease.props.amount).toEqual(100)
  })

  it('should register POST /release/debit route', async () => {
    const response = await request(app)
      .post('/release/debit')
      .send({ releaseName: 'test', amount: 100 })

    expect(response.status).toBe(201)
    expect(response.body.debitRelease.props._id).toBeDefined()
    expect(response.body.debitRelease.props.type).toEqual('debit')
    expect(response.body.debitRelease.props.releaseName).toEqual('test')
    expect(response.body.debitRelease.props.amount).toEqual(100)
  })

  it('should register get /release/consolidate route', async () => {
    for (let i = 1; i <= 10; i++) {
      await request(app)
        .post('/release/debit')
        .send({ releaseName: 'test', amount: 1 })
    }

    for (let i = 1; i <= 12; i++) {
      await request(app)
        .post('/release/credit')
        .send({ releaseName: 'test', amount: 1 })
    }

    const response = await request(app).get(
      `/release/consolidate?day=${DayJs().format('YYYY-MM-DD')}`,
    )

    expect(response.status).toBe(200)
    expect(response.body.consolidateAmount).toEqual(2)
  })
})
