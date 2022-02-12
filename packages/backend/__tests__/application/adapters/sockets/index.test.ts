var mockNotify
var mockGetID

jest.mock('../../../../src/application/use-cases/notify-users', () => {
  mockNotify = jest.fn()
  return {
    notify: mockNotify,
  }
})

jest.mock('@math-fights/common', () => {
  mockGetID = jest.fn(() => '123')
  return {
    ...(jest.requireActual('@math-fights/common') as any),
    getID: mockGetID,
  }
})

import {SocketAdapter} from '../../../../src/application/adapters/sockets/index'
import {InMemoryUserRepository} from '../../../../src/infrastructure/persistance/InMemoryUserRepository'
import {IUsersRepository} from '../../../../src/core/repositories/IUserRepository'
import {IRoomRepository} from '../../../../src/core/repositories/IRoomRepository'
import {InMemoryRoomRepository} from '../../../../src/infrastructure/persistance/InMemoryRoomRepository'

describe('tests on SocketAdapter', () => {
  let socketAdapter: SocketAdapter
  let users: IUsersRepository
  let rooms: IRoomRepository

  let io = {
    to: jest.fn(() => ({emit: jest.fn()})),
  }

  let client = {
    on: jest.fn(),
  }

  beforeEach(() => {
    users = new InMemoryUserRepository()
    rooms = new InMemoryRoomRepository()
    socketAdapter = new SocketAdapter(users, rooms, client as any, io as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('tests on queue method', () => {
    it('should players not be ready', () => {
      const mockPlayersAreReady = jest.fn()

      rooms.playersAreReady = mockPlayersAreReady

      socketAdapter.queue('EASY')
      expect(mockPlayersAreReady).toHaveBeenCalledTimes(1)
    })

    it('should players be ready and notified', () => {
      const client1 = {
        id: '123',
        on: jest.fn(),
      }

      const client2 = {
        id: '567',
        on: jest.fn(),
      }

      const socketAdapterClient1 = new SocketAdapter(
        users,
        rooms,
        client1 as any,
        io as any,
      )

      const socketAdapterClient2 = new SocketAdapter(
        users,
        rooms,
        client2 as any,
        io as any,
      )

      socketAdapterClient1.queue('MEDIUM')
      socketAdapterClient2.queue('MEDIUM')
      expect(mockNotify).toHaveBeenCalledTimes(1)
    })
  })

  describe('tests on rematch method', () => {
    it('should users be updated to rematch property to true', () => {
      const client1 = {
        id: '123',
        on: jest.fn(),
      }

      const client2 = {
        id: '567',
        on: jest.fn(),
      }

      const socketAdapterClient1 = new SocketAdapter(
        users,
        rooms,
        client1 as any,
        io as any,
      )

      const socketAdapterClient2 = new SocketAdapter(
        users,
        rooms,
        client2 as any,
        io as any,
      )

      mockGetID.mockImplementation(() => '55555')
      socketAdapterClient1.queue('MEDIUM')
      socketAdapterClient2.queue('MEDIUM')

      socketAdapterClient1.rematch('55555')
      expect(rooms.getPlayers('55555')[0].rematch).toBe(true)

      socketAdapterClient2.rematch('55555')
      expect(mockNotify).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        'rematch',
        expect.anything(),
      )
    })
  })
})
