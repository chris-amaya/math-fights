import dotenv from 'dotenv'
import App from './app'

dotenv.config()
const server = new App(8000)

server.start(() => {
  console.log(`Server Running on ${server.port}`)
})
