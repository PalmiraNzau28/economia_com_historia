import { createServer } from 'node:http'
import app from './app.js'

const port = Number(process.env.PORT ?? 4000)

const server = createServer(app)

server.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
