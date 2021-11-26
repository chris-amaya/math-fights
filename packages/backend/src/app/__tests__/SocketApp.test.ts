import SocketApp from '../classes/SocketApp'
import Users from '../classes/Users'

describe('tests on SocketApp', () => {
  let socketApp: SocketApp

  const user1 = {id: '10000'}
  const user2 = {id: '20000'}
  const user3 = {id: '30000'}

  let rooms = []

  const mockClient = {on: jest.fn(), emit: jest.fn(), id: '1'}
  const mockServerEmit = jest.fn()
  const mockServer = {
    on: jest.fn(),
    to: jest.fn(() => ({emit: mockServerEmit})),
  }

  beforeEach(() => {
    socketApp = new SocketApp(mockClient as any, mockServer as any)
    rooms = [
      {id: '1', difficult: 'HARD', users: [user1, user2]},
      {id: '2', difficult: 'HARD', users: [user3]},
    ]
    ;(socketApp['room'].rooms as any) = rooms
  })

  test('should queue and notify to all users in the room', () => {
    const mockNotify = (Users.prototype.notify = jest.fn())
    socketApp['users'].user = [user1, user2, user3]
    ;(socketApp['room'].rooms as any) = rooms
    socketApp['queue']('HARD')

    expect(mockNotify).toHaveBeenCalled()
  })

  test('should only queue', () => {
    const mockNotify = (Users.prototype.notify = jest.fn())
    const mockAddRoom = jest.fn()
    ;(socketApp['room'].rooms as any) = rooms
    socketApp['room']['addRoom'] = mockAddRoom
    socketApp['queue']('EASY')
    expect(mockNotify).not.toHaveBeenCalled()
    expect(mockAddRoom).toHaveBeenCalledWith('EASY', expect.any(Object))
  })

  test('should only queue', () => {
    const mockNotify = (Users.prototype.notify = jest.fn())
    const mockAddRoom = jest.fn()
    const user4 = {id: '40000'}
    const rooms = [
      {id: '1', difficult: 'HARD', users: [user1, user2]},
      {id: '2', difficult: 'HARD', users: [user3, user4]},
    ]
    ;(socketApp['room'].rooms as any) = rooms
    socketApp['room']['addRoom'] = mockAddRoom
    socketApp['queue']('HARD')
    expect(mockNotify).not.toHaveBeenCalled()
    expect(mockAddRoom).toHaveBeenCalledWith('HARD', expect.any(Object))
  })

  test('let know a user wants to rematch', () => {
    rooms.push({id: '3', difficult: 'HARD', users: [user1, user2]})

    const roomId = '3'
    mockClient.id = rooms[2].users[0].id
    const mockUpdateUser = jest.fn()
    socketApp['room'].updateUser = mockUpdateUser

    socketApp['rematch']({roomId})

    expect(mockUpdateUser).toHaveBeenCalledWith(
      {id: mockClient.id, rematch: true},
      roomId,
    )
  })

  test('user doesnt want to play', () => {
    const mockRemoveUser = jest.fn()
    const mockNotify = (Users.prototype.notify = jest.fn())
    mockClient.id = user1.id
    socketApp['users'].user = [user1, user2, user3]
    socketApp['users'].remove = mockRemoveUser
    socketApp['room'].deleteRoomById = mockRemoveUser

    socketApp['disconnect']()

    expect(mockNotify).toHaveBeenCalled()
    expect(mockRemoveUser).toHaveBeenCalledWith(user1.id)
  })

  test('should rematch the game', () => {
    const mockNotify = (socketApp['users'].notify = jest.fn())
    const user1 = {id: '50000', rematch: false}
    const user2 = {id: '60000', rematch: true}
    mockClient.id = user1.id
    const roomId = '6'
    rooms.push({id: roomId, difficult: 'HARD', users: [user1, user2]})
    ;(socketApp['room'].rooms as any) = rooms

    socketApp['rematch']({roomId})

    expect(mockNotify).toHaveBeenCalledWith(
      expect.any(Object),
      'rematch',
      expect.any(Object),
    )
  })

  test('should be the status game as draw', () => {
    const user1 = {id: '50000', rematch: false}
    const user2 = {id: '60000', rematch: true, correctAnswers: 5}
    mockClient.id = user1.id
    const roomId = '6'
    rooms.push({id: roomId, difficult: 'HARD', users: [user1, user2]})
    ;(socketApp['room'].rooms as any) = rooms

    socketApp['finish']({answers: {correct: 5, wrong: 0}, roomId, timer: 10})
  })

  // TODO
  // test('should be the status game as win', () => {})

  test('user has disconnected', () => {
    const mockRemoveUser = jest.fn()
    const mockNotify = (Users.prototype.notify = jest.fn())
    mockClient.id = user1.id
    socketApp['users'].user = [user1, user2, user3]
    socketApp['users'].remove = mockRemoveUser
    socketApp['room'].deleteRoomById = mockRemoveUser

    socketApp['disconnect']()

    expect(mockNotify).toHaveBeenCalled()
    expect(mockRemoveUser).toHaveBeenCalledWith(user1.id)
  })
})
