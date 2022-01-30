import {SocketApp} from '../src/classes/Socket'
import Room from '../src/classes/Room'
import Users from '../src/classes/Users'
import {notify} from '../src/utils/socket.utils'
import setupClients, {IClient} from './utils/setupClients'

jest.mock('../src/utils/socket.utils')

describe('should queue', () => {
  const mockNotify = notify as jest.MockedFunction<typeof notify>

  let room: Room | null = null
  let users: Users | null = null
  let clients: IClient[] = []

  let clientsData: IClient[] = [
    {
      id: '12345',
    },
    {
      id: '67890',
    },
    {
      id: '12345',
    },
  ]

  beforeEach(() => {
    room = new Room()
    users = new Users()

    clients = setupClients(clientsData, room, users)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should try to find a room by availability', () => {
    const mockFindRoom = jest.fn()
    ;(clients[0].socketApp as any).room.findRoomAvailable = mockFindRoom

    clients[0].socketApp.queue('EASY')

    expect(mockFindRoom).toHaveBeenCalled()
  })

  it('should user be added in a new room', () => {
    const mockAddRoom = jest.fn()
    ;(clients[0].socketApp as any).room.addRoom = mockAddRoom

    const difficult = 'EASY'
    clients[0].socketApp.queue(difficult)

    expect(mockAddRoom).toHaveBeenCalledWith(difficult, expect.any(Object))
  })

  it('should room length to be 1', () => {
    clients[0].socketApp.queue('EASY')

    expect((room as any).rooms.length).toBe(1)
  })

  it('should room length to be 1 with only 1 player', () => {
    clients[0].socketApp.queue('EASY')

    expect((room as any).rooms[0].users.length).toBe(1)
    expect((room as any).rooms[0].users).toMatchObject([
      {
        id: '12345',
      },
    ])
  })

  it('should room contain 2 players', () => {
    clients[0].socketApp.queue('EASY')
    clients[1].socketApp.queue('EASY')

    expect(room!.rooms[0].users).toMatchObject([
      {
        id: '12345',
      },
      {
        id: '67890',
      },
    ])
  })

  it('should a user with the same id be in a new room', () => {
    clients[0].socketApp.queue('EASY')
    clients[1].socketApp.queue('EASY')
    clients[2].socketApp.queue('EASY')

    expect(room!.rooms.length).toBe(2)
    expect(room!.rooms[1].users.length).toBe(1)
    expect(room!.rooms[1].users).toMatchObject([
      {
        id: '12345',
      },
    ])
  })

  it('users are notified', () => {
    clients[0].socketApp.queue('EASY')
    clients[1].socketApp.queue('EASY')
    expect(mockNotify).toHaveBeenCalled()
  })

  it('users are not notified', () => {
    clients[0].socketApp.queue('EASY')
    expect(mockNotify).not.toHaveBeenCalled()
    expect(mockNotify).toHaveBeenCalledTimes(0)
  })
})
