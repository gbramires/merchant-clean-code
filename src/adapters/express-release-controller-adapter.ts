import { ReleaseController } from '@/interfaces/release-controller'
import { Request, Response, Router } from 'express'

export class ExpressReleaseControllerAdapter {
  constructor(private readonly controller: ReleaseController) {}

  registerRoutes(router: Router): void {
    router.post('/release/debit', async (req: Request, res: Response) => {
      this.controller.createReleaseDebit(req, res)
    })
    router.post('/release/credit', async (req: Request, res: Response) => {
      this.controller.createReleaseCredit(req, res)
    })
    router.get('/release/consolidate', async (req: Request, res: Response) => {
      this.controller.consolidateAmountByDay(req, res)
    })
  }
}
