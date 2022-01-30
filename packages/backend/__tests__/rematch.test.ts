import Room from '../src/classes/Room'
import Users from '../src/classes/Users'
// import setupClients, {IClient} from './utils/setupClients'
import setupClients, {IClient} from './utils/setupClients'

describe('should finish event', () => {
  let room: Room | null = null
  let users: Users | null = null

  // setting up client's data
  let clientsData: IClient[] = [
    {
      id: '12345',
    },
    {
      id: '67890',
    },
  ]

  let clients: IClient[] = []

  beforeEach(() => {
    room = new Room()
    users = new Users()

    // setting up initial state
    clients = setupClients(clientsData, room, users)

    clients[0].socketApp?.queue('EASY')
    clients[1].socketApp?.queue('EASY')
  })

  test.todo('should tell a user has finished')
})
