import Room from '../classes/Room'
import Users from '../classes/Users'
import {queue} from '../controllers/socket.controller'

import {ISocketContext} from '../sockets/socket'

describe('Should queue [edge cases] for only 1 player in queue', () => {
  let contextPlayer1: Partial<ISocketContext> | null = {
    client: {
      id: '12345',
    } as any,
    io: {
      to: jest.fn(() => ({emit: jest.fn()})),
    } as any,
  }

  let contextPlayer2: Partial<ISocketContext> | null = {
    client: {
      id: '67890',
    } as any,
    io: {
      to: jest.fn(() => ({emit: jest.fn()})),
    } as any,
  }

  let room: Room | null = null
  let users: Users | null = null

  beforeEach(() => {
    room = new Room()
    users = new Users()

    if (contextPlayer1) {
      contextPlayer1.room = room
      contextPlayer1.users = users
    }

    if (contextPlayer2) {
      contextPlayer2.room = room
      contextPlayer2.users = users
    }
  })
  it('should try to find a room by availability', () => {
    const mockFindRoom = jest.fn()
    room!.findRoomAvailable = mockFindRoom

    queue.call(contextPlayer1 as any, 'EASY')

    expect(mockFindRoom).toHaveBeenCalled()
  })

  it('should user be added in a new room', () => {
    const mockAddRoom = jest.fn()
    room!.addRoom = mockAddRoom

    const difficult = 'EASY'

    queue.call(contextPlayer1 as any, 'EASY')

    expect(mockAddRoom).toHaveBeenCalledWith(difficult, expect.any(Object))
  })

  it('should room length to be 1', () => {
    queue.call(contextPlayer1 as any, 'EASY')

    expect((room as any).rooms.length).toBe(1)
  })

  it('should room length to be 1 with only 1 player', () => {
    queue.call(contextPlayer1 as any, 'EASY')

    expect((room as any).rooms[0].users.length).toBe(1)
    expect((room as any).rooms[0].users).toMatchObject([
      {
        id: '12345',
      },
    ])
  })

  it('should room contain 2 players', () => {
    queue.call(contextPlayer1 as any, 'EASY')
    queue.call(contextPlayer2 as any, 'EASY')

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
    queue.call(contextPlayer1 as any, 'EASY')
    queue.call(contextPlayer2 as any, 'EASY')
    queue.call(contextPlayer1 as any, 'EASY')

    expect(room!.rooms.length).toBe(2)
    expect(room!.rooms[1].users.length).toBe(1)
    expect(room!.rooms[1].users).toMatchObject([
      {
        id: '12345',
      },
    ])
  })
})
