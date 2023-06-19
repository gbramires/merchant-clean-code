export interface IErrorResponse {
  error: string
  statusCode: number
  message: string
}

export class ErrorResponse extends Error {
  public readonly error: string
  public readonly statusCode: number
  public readonly message: string

  constructor({ error, statusCode, message }: IErrorResponse) {
    super(message)
    this.error = error
    this.statusCode = statusCode
    this.message = message
  }
}
