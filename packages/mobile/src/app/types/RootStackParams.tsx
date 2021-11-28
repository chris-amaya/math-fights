export type RootStackParams = {
  Home: undefined
  Difficult: undefined
  Game: undefined
  Results: undefined
  WaitingRoom: {
    text: string
    displayTimer?: boolean
  }
  '[MULTIPLAYER]: Game': undefined
  '[MULTIPLAYER]: Results': undefined
}
