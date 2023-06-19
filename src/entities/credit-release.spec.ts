import { CreditRelease } from '@/entities/credit-release'
import { UniqueEntityID } from './types/unique-entity-id'
describe('Credit Release Entity', () => {
  describe('create', () => {
    it('should create a new credit release with default values', () => {
      const creditRelease = CreditRelease.create({
        releaseName: 'Credit Release Test',
        amount: 100,
      })

      expect(creditRelease).toBeInstanceOf(CreditRelease)
      expect(creditRelease._id).toBeDefined()
      expect(creditRelease.type).toBe('credit')
      expect(creditRelease.createdAt).toBeInstanceOf(Date)
      expect(creditRelease.releaseName).toBe('Credit Release Test')
      expect(creditRelease.amount).toBe(100)
    })

    it('should create a new credit release without createdAt', () => {
      const creditRelease = CreditRelease.create({
        releaseName: 'Credit Release Test',
        amount: 100,
      })

      expect(creditRelease).toBeInstanceOf(CreditRelease)
      expect(creditRelease._id).toBeDefined()
      expect(creditRelease.type).toBe('credit')
      expect(creditRelease.createdAt).toBeInstanceOf(Date)
      expect(creditRelease.releaseName).toBe('Credit Release Test')
      expect(creditRelease.amount).toBe(100)
    })

    it('should create a new credit release with id and createdAt', () => {
      const data = {
        releaseName: 'Credit Release Test',
        amount: 100,
        _id: new UniqueEntityID().toValue(),
        createdAt: new Date(2021, 5, 10),
      }
      const creditRelease = CreditRelease.create(data)

      expect(creditRelease).toBeInstanceOf(CreditRelease)
      expect(creditRelease._id).toBe(data._id)
      expect(creditRelease.type).toBe('credit')
      expect(creditRelease.createdAt).toBe(data.createdAt)
      expect(creditRelease.releaseName).toBe(data.releaseName)
      expect(creditRelease.amount).toBe(data.amount)
    })
  })
})
