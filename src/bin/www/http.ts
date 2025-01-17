import { app } from '../../app'
import http from 'http'

const PORT = process.env.PORT ?? 3000

app.set('port', PORT)

const server = http.createServer(app as any)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
