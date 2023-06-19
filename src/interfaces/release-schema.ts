import joi from 'joi'

export const releaseSchema = {
  createReleaseValidation: joi
    .object({
      amount: joi.number().precision(2).required(),
      releaseName: joi.string().max(40).required(),
    })
    .required(),
  consolidateAmountValidation: joi
    .object({
      day: joi
        .string()
        .pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
        .message('Invalid date format')
        .required(),
    })
    .required(),
}
