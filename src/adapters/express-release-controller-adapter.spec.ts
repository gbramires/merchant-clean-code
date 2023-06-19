import { ReleaseController } from '@/interfaces/release-controller'
import { Request, Response, Router } from 'express'
import { ExpressReleaseControllerAdapter } from './express-release-controller-adapter'

describe('ExpressReleaseControllerAdapter', () => {
  describe('registerRoutes', () => {
    const mockController: ReleaseController = {
      createReleaseDebit: vi.fn(async (req: Request, res: Response) => {
        res.status(201).send(req.body)
      }),
      createReleaseCredit: vi.fn(async (req: Request, res: Response) => {
        res.status(201).send(req.body)
      }),
      consolidateAmountByDay: vi.fn(async (req: Request, res: Response) => {
        res.status(200).send(req.body)
      }),
      // @ts-ignore
      createReleaseDebitInteractor: vi.fn(),
      // @ts-ignore
      createReleaseCreditInteractor: vi.fn(),
    }
    const adapter = new ExpressReleaseControllerAdapter(mockController)

    const mockRouter = {
      post: vi.fn(),
      get: vi.fn(),
    }

    adapter.registerRoutes(mockRouter as unknown as Router)

    it('should register a route to create a release debit', () => {
      expect(mockRouter.post).toHaveBeenCalledWith(
        '/release/debit',
        expect.any(Function),
      )

      const req = { body: { amount: 10 } } as Request

      const send = vi.fn()
      const res = { status: vi.fn(() => ({ send })) } as unknown as Response

      const [, handler] = mockRouter.post.mock.calls[0]
      handler(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(send).toHaveBeenCalledWith({ amount: 10 })
    })

    it('should register a route to create a release credit', () => {
      expect(mockRouter.post).toHaveBeenCalledWith(
        '/release/credit',
        expect.any(Function),
      )

      const req = { body: { amount: 10 } } as Request

      const send = vi.fn()
      const res = { status: vi.fn(() => ({ send })) } as unknown as Response

      const [, handler] = mockRouter.post.mock.calls[0]
      handler(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(send).toHaveBeenCalledWith({ amount: 10 })
    })

    it('should register a route to consolidate the values of the day', () => {
      expect(mockRouter.get).toHaveBeenCalledWith(
        '/release/consolidate',
        expect.any(Function),
      )

      const req = { body: { consolidateAmount: 10 } } as Request

      const send = vi.fn()
      const res = { status: vi.fn(() => ({ send })) } as unknown as Response

      const [, handler] = mockRouter.get.mock.calls[0]
      handler(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(send).toHaveBeenCalledWith({ consolidateAmount: 10 })
    })
  })
})
