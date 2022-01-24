import {mock} from '@math-fights/common'
import Room from '../../classes/Room'

describe('Test on class Room.ts', () => {
  let room: Room
  const player1 = {id: '12345'}
  const player2 = {id: '56789'}
  const player3 = {id: '10000'}

  beforeEach(() => {
    room = new Room()

    mock(room, 'rooms', [
      {id: '1', difficult: 'MEDIUM', users: [player1]},
      {id: '2', difficult: 'MEDIUM', users: [player2, player3]},
    ])
  })

  test('should add a room', () => {
    room.addRoom('MEDIUM', {id: '51232'})
    expect(room.rooms.length).toBe(3)
  })

  test('should find a room by difficult', () => {
    const _room = room.findRoomAvailable('MEDIUM')

    if (_room !== false) {
      const index = _room.index
      expect(index).toBe(0)
    } else {
      throw new Error('False recived when should recived an object')
    }
  })

  test('should add a user to a room in specific', () => {
    room.addUserToRoomById('1', {id: '12345'})

    const roomUsers = room.rooms[0].users
    expect(roomUsers).not.toBeFalsy()

    if (roomUsers) {
      expect(roomUsers[1]).toBeTruthy()
    } else {
      throw new Error(`Received ${roomUsers}, it should be an array of objects`)
    }
  })

  test('should findRoomByDifficult find a room', () => {
    const _room = room.findRoomAvailable('MEDIUM')
    expect(_room).toBeTruthy()
  })

  test('should findRoomByDifficult not find a room', () => {
    const _room = room.findRoomAvailable('HARD')
    expect(_room).toBe(false)
  })

  test('should get an opponent', () => {
    const player1Opponent = room.getOpponent('2', player2.id)
    expect(player1Opponent.id).toBe(player3.id)
  })

  test('should get room by id', () => {
    const {room: _room} = room.getRoomById('1')

    expect(_room).toEqual({
      id: '1',
      difficult: 'MEDIUM',
      users: [{id: '12345'}],
    })
  })

  test('should update user', () => {
    room.updateUser({id: '12345', correctAnswers: 5}, '1')

    const {room: _room} = room.getRoomById('1')
    const user = _room.users.find((user) => user.id === '12345')
    expect(user?.correctAnswers).toBe(5)
  })

  test('should bothPlayersHaveFinished return true', () => {
    room.updateUser({id: '56789', finished: true}, '2')
    room.updateUser({id: '10000', finished: true}, '2')
    const finished = room.bothPlayersHaveFinished('2')
    expect(finished).toBe(true)
  })

  test.skip('should player1 be the winner', () => {
    const player1 = {id: '55555', correctAnswers: 5}
    const player2 = {id: '11111', correctAnswers: 1}

    mock(room, 'rooms', [
      {id: '1', difficult: 'MEDIUM', users: [player1, player2]},
    ])

    const {winner} = room.getWinner(player1, player2)

    expect(winner).toEqual(player1)
  })

  test('should delete room', () => {
    const currentRoomLength = room.rooms.length
    room.deleteRoomByUserId('12345')
    expect(room.rooms.length).toBe(currentRoomLength - 1)
  })
})
