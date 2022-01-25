import Room from '../classes/Room'
import {SocketApp} from '../classes/Socket'
import Users from '../classes/Users'
import setupClients, {IClient} from './utils/setupClients'

describe('should finish event', () => {
  let room: Room | null = null
  let users: Users | null = null

  // setting up client's data
  let clientsData: IClient[] = [
    {
      id: '12345',
    },
    {
      id: '67890',
    },
  ]

  let clients: IClient[] = []

  beforeEach(() => {
    room = new Room()
    users = new Users()

    // setting up initial state
    clients = setupClients(clientsData, room, users)

    clients[0].socketApp?.queue('EASY')
    clients[1].socketApp?.queue('EASY')
  })

  it('should tell a user has finished', () => {
    const client1 = clients[0]

    client1.socketApp?.finish({
      answers: {
        correct: 5,
        wrong: 5,
      },
      roomId: room!.rooms[0].id,
      timer: 2,
    })

    // since i want to be sure i find the correct user i iterate all users
    // saved in the room
    expect(
      room?.rooms[0].users.find((user) => user.id === client1.id)?.finished,
    ).toBe(true)
  })

  it.skip('should fire socket event `winner`', () => {
    clients.forEach((client) =>
      client.socketApp?.finish({
        answers: {correct: 5, wrong: 5},
        roomId: room!.rooms[0].id,
        timer: 5,
      }),
    )
  })
})
