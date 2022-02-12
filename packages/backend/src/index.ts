import dotenv from 'dotenv'
import {ExpressAdapter} from './application/adapters/express'
import {InMemoryRoomRepository} from './infrastructure/persistance/InMemoryRoomRepository'
import {InMemoryUserRepository} from './infrastructure/persistance/InMemoryUserRepository'

dotenv.config()

const userRepository = new InMemoryUserRepository()
const roomRepository = new InMemoryRoomRepository()

const expressAdapter = new ExpressAdapter(8000, userRepository, roomRepository)

expressAdapter.start(() => {
  console.log(`Server Running on ${expressAdapter.port}`)
})
