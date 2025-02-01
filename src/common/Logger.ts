import { createLogger, format, transports } from 'winston'
const { timestamp, prettyPrint } = format

export const logger = createLogger({
  level: 'debug',
  format: format.combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.File({ filename: './src/logs/error-logs.log', level: 'error' })
  ]
})
