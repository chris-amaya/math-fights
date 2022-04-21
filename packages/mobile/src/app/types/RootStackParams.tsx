import {IGameMode} from '@math-fights/common'

export type RootStackParams = {
  Home: undefined
  Difficult: undefined
  Game: undefined
  Results: undefined
  WaitingRoom: {
    text: string
    displayTimer?: boolean
  }
  Options: undefined
  '[MULTIPLAYER]: Game': undefined
  '[MULTIPLAYER]: Results': undefined
}
