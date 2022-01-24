import {GameDifficulty} from '@math-fights/common'

function findRoom(difficult: GameDifficulty) {
  const roomIndex = this.rooms.findIndex(
    (room) => room.difficult === difficult && room.users.length < 2,
  )

  if (roomIndex === -1) return false

  const {users} = this.rooms[roomIndex]
  if (users.length <= 1) {
    return {
      index: roomIndex,
      room: this.rooms[roomIndex],
    }
  } else {
    console.log('room: no space', users)

    return false
  }
}

export default findRoom
