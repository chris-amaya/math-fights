var mockGetID
jest.mock('@math-fights/common', () => {
  mockGetID = jest.fn(() => '123')
  return {
    getID: mockGetID,
  }
})

import {User} from '../../../src/core/entities/IUser'
import {InMemoryRoomRepository} from '../../../src/infrastructure/persistance/InMemoryRoomRepository'

describe('tests on InMemoryRoomRepository', () => {
  let roomRepository: InMemoryRoomRepository
  let user: User

  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository()
    user = new User('12345')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should add a room', () => {
    const roomId = roomRepository.addRoom('EASY', user)
    expect(roomId).toBeDefined()
  })

  it('should find a room available', () => {
    const roomId = roomRepository.addRoom('EASY', user)
    const room = roomRepository.findRoomAvailable('EASY') as any
    const room2 = roomRepository.findRoomAvailable('HARD') as any

    expect(room).toBeDefined()
    expect(room.id).toBe(roomId)
    expect(room2).toBe(false)
  })

  it('should add user to room by its id', () => {
    const user2 = new User('54321')
    const roomId = roomRepository.addRoom('EASY', user2)

    roomRepository.addUserToRoomById(roomId, user)

    expect(() =>
      (roomRepository as any).findRoomById(roomId),
    ).not.toThrowError()
    expect((roomRepository as any).findRoomById(roomId)).toBeDefined()
  })

  it('should get players', () => {
    const user2 = new User('54321')
    mockGetID.mockImplementationOnce(() => '123')

    const roomId = roomRepository.addRoom('EASY', user2)
    roomRepository.addUserToRoomById(roomId, user)

    expect(roomId).toEqual(expect.any(String))
    expect(roomRepository.getPlayers(roomId)).toEqual(
      expect.arrayContaining([user, user2]),
    )
  })

  it('should detect players are ready', () => {
    mockGetID.mockImplementation(() => '555555')
    roomRepository.addRoom('EASY', user)

    const user2 = new User('11111')
    roomRepository.addUserToRoomById('555555', user2)

    // expect(mockGetID).toHaveBeenCalled()
    expect(roomRepository.playersAreReady('555555')).toBe(true)
  })

  it('should delete room by id', () => {
    const roomId = roomRepository.addRoom('EASY', user)
    const roomsLength = (roomRepository as any).rooms.length
    roomRepository.deleteRoomById(roomId)

    expect(roomsLength).toBe((roomRepository as any).rooms.length + 1)
  })

  it('should delete room by user id', () => {
    const roomId = roomRepository.addRoom('EASY', user)
    roomRepository.addUserToRoomById(roomId, user)
    const roomsLength = (roomRepository as any).rooms.length
    roomRepository.deleteRoomByUserId(user.id)

    expect(roomsLength).toBe((roomRepository as any).rooms.length + 1)
  })

  it('should update user data', () => {
    mockGetID.mockImplementation(() => '555555')
    roomRepository.addRoom('EASY', user)

    expect(roomRepository.findRoomById('555555').users[0].timing).toBe(
      undefined,
    )

    roomRepository.updateUser('555555', user.id, {
      timing: 5,
    })

    expect(roomRepository.findRoomById('555555').users[0].timing).toBe(5)
  })

  it('should get opponent', () => {
    mockGetID.mockImplementation(() => '555555')
    roomRepository.addRoom('HARD', user)

    const user2 = new User('99999')
    roomRepository.addUserToRoomById('555555', user2)

    expect(roomRepository.getOpponent('555555', user.id)).toMatchObject(user2)
  })

  it('should detect players have finished', () => {
    // mockGetID.mockImplementation(() => '555555')
    user.finished = true
    roomRepository.addRoom('EASY', user)

    const user2 = new User('99999')
    user2.finished = true
    roomRepository.addUserToRoomById('555555', user2)

    // roomRepository.updateUser('555555', user2.id, {
    //   finished: undefined,
    // })

    expect(roomRepository.playersHaveFinished('555555')).toBe(true)
  })
})
