import { releaseSchema } from './release-schema'

describe('releaseSchema', () => {
  describe('createReleaseValidation', () => {
    it('should throw error for invalid input', () => {
      const invalidInput = {
        amount: 10.123, // should have only 2 decimal places
        releaseName: 'This Release Name is way too long to pass the validation', // more than 40 characters
      }

      const result =
        releaseSchema.createReleaseValidation.validate(invalidInput)

      expect(result.error).toBeDefined()
    })

    it('should not throw error for valid input', () => {
      const validInput = {
        amount: 10.12,
        releaseName: 'Valid Release Name',
      }

      expect(() =>
        releaseSchema.createReleaseValidation.validate(validInput),
      ).not.toThrow()
    })
  })
})
