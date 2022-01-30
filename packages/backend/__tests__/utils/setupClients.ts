import {SocketApp} from '../../src/classes/Socket'
import Room from '../../src/classes/Room'
import Users from '../../src/classes/Users'

export interface ICreateClient {
  (overrides?: any): {
    io: any
    id: string
  }
}

export interface IClient {
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
    const data = createClient({
      id: client.id,
    })

    return {
      socketApp: new SocketApp(data as any, data.io, room!, users!),
      ...data,
    }
  })
}

export default setupClients
