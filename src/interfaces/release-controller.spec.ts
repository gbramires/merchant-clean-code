import { CreateReleaseCreditInteractor } from '@/use-cases/create-release-credit-interactor'
import { CreateReleaseDebitInteractor } from '@/use-cases/create-release-debit-interactor'
import { SumReleasesByDayInteractor } from '@/use-cases/sum-releases-by-day-interactor'
import { Request, Response } from 'express'
import { makeBodyCreateRelease } from 'test/factories/make-body-create-release'
import { ReleaseController } from './release-controller'
import { releaseSchema } from './release-schema'

describe('ReleaseController', () => {
  let mockCreateReleaseDebitInteractor: CreateReleaseDebitInteractor
  let mockCreateReleaseCreditInteractor: CreateReleaseCreditInteractor
  let mockSumReleasesByDayInteractor: SumReleasesByDayInteractor
  let releaseController: ReleaseController
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>

  beforeAll(() => {
    mockCreateReleaseDebitInteractor = {
      execute: vi.fn(),
    } as unknown as CreateReleaseDebitInteractor
    mockCreateReleaseCreditInteractor = {
      execute: vi.fn(),
    } as unknown as CreateReleaseCreditInteractor
    mockSumReleasesByDayInteractor = {
      execute: vi.fn(),
    } as unknown as SumReleasesByDayInteractor
    releaseController = new ReleaseController(
      mockCreateReleaseDebitInteractor,
      mockCreateReleaseCreditInteractor,
      mockSumReleasesByDayInteractor,
    )
    mockRequest = makeBodyCreateRelease()
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    }
  })

  describe('createReleaseDebit', () => {
    it('should return 400 if validation fails', async () => {
      releaseSchema.createReleaseValidation.validate = vi.fn().mockReturnValue({
        error: { message: 'Validation error' },
      })

      await releaseController.createReleaseDebit(
        mockRequest as Request,
        mockResponse as Response,
      )

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Validation error',
      })
    })

    it('should call createReleaseDebitInteractor and return 201 with createdReleaseDebit', async () => {
      releaseSchema.createReleaseValidation.validate = vi
        .fn()
        .mockReturnValue({})

      mockCreateReleaseDebitInteractor.execute = vi.fn().mockReturnValueOnce({
        debitRelease: {
          amount: mockRequest.body.amount,
          releaseName: mockRequest.body.releaseName,
        },
      })

      await releaseController.createReleaseDebit(
        mockRequest as Request,
        mockResponse as Response,
      )

      expect(mockCreateReleaseDebitInteractor.execute).toHaveBeenCalledWith({
        amount: mockRequest.body.amount,
        releaseName: mockRequest.body.releaseName,
      })

      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(mockResponse.json).toHaveBeenCalledWith({
        debitRelease: {
          amount: mockRequest.body.amount,
          releaseName: mockRequest.body.releaseName,
        },
      })
    })
  })

  describe('createReleaseCredit', () => {
    it('should return 400 if validation fails', async () => {
      releaseSchema.createReleaseValidation.validate = vi.fn().mockReturnValue({
        error: { message: 'Validation error' },
      })

      await releaseController.createReleaseCredit(
        mockRequest as Request,
        mockResponse as Response,
      )

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Validation error',
      })
    })

    it('should call createReleaseCreditInteractor and return 201 with createdReleaseCredit', async () => {
      releaseSchema.createReleaseValidation.validate = vi
        .fn()
        .mockReturnValue({})

      mockCreateReleaseCreditInteractor.execute = vi.fn().mockReturnValueOnce({
        creditRelease: {
          amount: mockRequest.body.amount,
          releaseName: mockRequest.body.releaseName,
        },
      })

      await releaseController.createReleaseCredit(
        mockRequest as Request,
        mockResponse as Response,
      )

      expect(mockCreateReleaseCreditInteractor.execute).toHaveBeenCalledWith({
        amount: mockRequest.body.amount,
        releaseName: mockRequest.body.releaseName,
      })

      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(mockResponse.json).toHaveBeenCalledWith({
        creditRelease: {
          amount: mockRequest.body.amount,
          releaseName: mockRequest.body.releaseName,
        },
      })
    })
  })

  describe('consolidateAmountByDay', () => {
    it('should return 400 if validation fails', async () => {
      releaseSchema.consolidateAmountValidation.validate = vi
        .fn()
        .mockReturnValue({
          error: { message: 'Validation error' },
        })

      await releaseController.consolidateAmountByDay(
        mockRequest as Request,
        mockResponse as Response,
      )

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Validation error',
      })
    })
  })
})
