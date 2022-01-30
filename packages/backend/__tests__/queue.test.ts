import {SocketApp} from '../src/classes/Socket'
import Room from '../src/classes/Room'
import Users from '../src/classes/Users'

describe('should queue', () => {
  const mockNotify = jest.fn()

  // jest.mock(
  //   '../utils/socket.utils',
  //   () =>
  //   jest.fn(() => ({
  //     notify: mockNotify,
  //   })),
  // )

  let socketApp: SocketApp
  let socketApp2: SocketApp
  let socketApp3: SocketApp

  let room: Room | null = null
  let users: Users | null = null
  beforeEach(() => {
    room = new Room()
    users = new Users()

    const createClient = (overrides?: any) => ({
      client: {
        id: '12345',
      },
      io: {
        to: jest.fn(() => ({emit: jest.fn()})),
      },
      ...overrides,
    })

    const client1 = createClient({client: {id: '12345'}})
    const client2 = createClient({client: {id: '67890'}})
    const client3 = createClient({client: {id: '12345'}})

    socketApp = new SocketApp(client1.client, client1.io, room, users)
    socketApp2 = new SocketApp(client2.client, client2.io, room, users)
    socketApp3 = new SocketApp(client3.client, client3.io, room, users)
  })

  it('should try to find a room by availability', () => {
    const mockFindRoom = jest.fn()
    ;(socketApp as any).room.findRoomAvailable = mockFindRoom

    socketApp.queue('EASY')

    expect(mockFindRoom).toHaveBeenCalled()
  })

  it('should user be added in a new room', () => {
    const mockAddRoom = jest.fn()
    ;(socketApp as any).room.addRoom = mockAddRoom

    const difficult = 'EASY'
    socketApp.queue(difficult)

    expect(mockAddRoom).toHaveBeenCalledWith(difficult, expect.any(Object))
  })

  it('should room length to be 1', () => {
    socketApp.queue('EASY')

    expect((room as any).rooms.length).toBe(1)
  })

  it('should room length to be 1 with only 1 player', () => {
    socketApp.queue('EASY')

    expect((room as any).rooms[0].users.length).toBe(1)
    expect((room as any).rooms[0].users).toMatchObject([
      {
        id: '12345',
      },
    ])
  })

  it('should room contain 2 players', () => {
    socketApp.queue('EASY')
    socketApp2.queue('EASY')

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
    socketApp.queue('EASY')
    socketApp2.queue('EASY')
    socketApp3.queue('EASY')

    expect(room!.rooms.length).toBe(2)
    expect(room!.rooms[1].users.length).toBe(1)
    expect(room!.rooms[1].users).toMatchObject([
      {
        id: '12345',
      },
    ])
  })

  it.skip('users are notified', () => {
    socketApp.queue('EASY')
    socketApp2.queue('EASY')
    expect(mockNotify).toHaveBeenCalled()
  })
})
