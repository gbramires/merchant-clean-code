import { DebitRelease } from '@/entities/debit-release'
import { UniqueEntityID } from './types/unique-entity-id'
describe('Debit Release Entity', () => {
  describe('create', () => {
    it('should create a new debit release with default values', () => {
      const debitRelease = DebitRelease.create({
        releaseName: 'Debit Release Test',
        amount: 100,
      })

      expect(debitRelease).toBeInstanceOf(DebitRelease)
      expect(debitRelease._id).toBeDefined()
      expect(debitRelease.type).toBe('debit')
      expect(debitRelease.createdAt).toBeInstanceOf(Date)
      expect(debitRelease.releaseName).toBe('Debit Release Test')
      expect(debitRelease.amount).toBe(100)
    })

    it('should create a new debit release without createdAt', () => {
      const debitRelease = DebitRelease.create({
        releaseName: 'Debit Release Test',
        amount: 100,
      })

      expect(debitRelease).toBeInstanceOf(DebitRelease)
      expect(debitRelease._id).toBeDefined()
      expect(debitRelease.type).toBe('debit')
      expect(debitRelease.createdAt).toBeInstanceOf(Date)
      expect(debitRelease.releaseName).toBe('Debit Release Test')
      expect(debitRelease.amount).toBe(100)
    })

    it('should create a new debit release with id and createdAt', () => {
      const data = {
        releaseName: 'Debit Release Test',
        amount: 100,
        _id: new UniqueEntityID().toValue(),
        createdAt: new Date(2021, 5, 10),
      }
      const debitRelease = DebitRelease.create(data)

      expect(debitRelease).toBeInstanceOf(DebitRelease)
      expect(debitRelease._id).toBe(data._id)
      expect(debitRelease.type).toBe('debit')
      expect(debitRelease.createdAt).toBe(data.createdAt)
      expect(debitRelease.releaseName).toBe(data.releaseName)
      expect(debitRelease.amount).toBe(data.amount)
    })
  })
})
