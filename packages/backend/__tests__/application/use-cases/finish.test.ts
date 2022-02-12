import finishUseCase from '../../../src/application/use-cases/finish-event'
import queueUser from '../../../src/application/use-cases/queue-user'
import {User} from '../../../src/core/entities/IUser'
import {InMemoryRoomRepository} from '../../../src/infrastructure/persistance/InMemoryRoomRepository'
var mockNotify
var mockGetID

jest.mock('../../../src/application/use-cases/notify-users', () => {
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

describe('test on finish use case', () => {
  it('should fire winner', () => {
    const room = new InMemoryRoomRepository()
    const user1 = new User('123')
    const user2 = new User('456')

    mockGetID.mockImplementation(() => '55555')
    queueUser('EASY', user1, room, jest.fn() as any)
    queueUser('EASY', user2, room, jest.fn() as any)

    finishUseCase({
      data: {
        room: {
          id: '55555',
        },
        user: {
          answers: {correct: 7, wrong: 3},
          timing: 10,
          id: '123',
        },
      },
      factory: {
        io: jest.fn() as any,
        rooms: room,
      },
    })

    finishUseCase({
      data: {
        room: {
          id: '55555',
        },
        user: {
          answers: {correct: 5, wrong: 5},
          timing: 10,
          id: '456',
        },
      },
      factory: {
        io: jest.fn() as any,
        rooms: room,
      },
    })

    expect(mockNotify).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      'winner',
      expect.anything(),
    )
  })
})
