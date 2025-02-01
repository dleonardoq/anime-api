export class PersonalizedError extends Error {
  constructor (message: string, private readonly statusCode: number) {
    super(message)
  }

  getStatusCode = (): number => {
    return this.statusCode
  }
}
