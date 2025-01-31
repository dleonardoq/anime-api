export class PersonalizedError extends Error {
  constructor (message: string, private readonly statusCodeParam: number) {
    super(message)
  }

  getStatusCode = (): number => {
    return this.statusCodeParam
  }
}
