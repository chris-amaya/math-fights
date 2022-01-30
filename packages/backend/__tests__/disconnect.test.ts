import Room from '../src/classes/Room'
import Users from '../src/classes/Users'
import setupClients, {IClient} from './utils/setupClients'

describe('should finish event', () => {
  it('should finish event', () => {})

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

  it("should retrieve the room's data", () => {
    const mockFindRoom = jest.fn()

    room!.findRoomByUser = mockFindRoom

    clients[0].socketApp?.disconnect()

    expect(mockFindRoom).toHaveBeenCalled()
  })

  it('should room be removed', () => {
    clients[0].socketApp?.disconnect()

    const roomData = room?.findRoomByUser(clients[0].id)

    expect(roomData).toBeFalsy()
  })

  it('should room be removed', () => {
    clients[0].socketApp?.disconnect()
    clients[1].socketApp?.disconnect()

    const roomData = room?.findRoomByUser(clients[0].id)

    expect(roomData).toBeFalsy()
  })

  it('should user be removed', () => {
    const before = users!.user.length
    clients[0].socketApp?.disconnect()

    const after = users!.user.length

    expect(before > after).toBeTruthy()
  })
})
