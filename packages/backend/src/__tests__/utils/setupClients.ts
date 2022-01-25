import {SocketApp} from '../../classes/Socket'
import Room from '../../classes/Room'
import Users from '../../classes/Users'

interface ICreateClient {
  (overrides?: any): {
    io: any
    id: string
  }
}

interface IClient {
  id: string
  socketApp?: SocketApp
}

function setupClients(clients: IClient[], room: Room, users: Users): IClient[] {
  return clients.map((client) => {
    const createClient: ICreateClient = (overrides: any) => {
      return {
        io: {
          to: jest.fn(() => ({emit: jest.fn()})),
        },
        ...overrides,
      }
    }
    const data = createClient(...client.id)

    return {
      socketApp: new SocketApp(data as any, data.io, room!, users!),
      ...data,
    }
  })
}

export default setupClients
