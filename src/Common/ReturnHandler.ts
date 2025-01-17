import { returnType } from './Interface'

export const returnHandler = ({ statusCode, message, data }: returnType): returnType => {
  return {
    statusCode,
    message,
    data
  }
}
