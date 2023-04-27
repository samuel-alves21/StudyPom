type InicialState = {
  pomodoro: boolean
  short: boolean
  long: boolean
  wasClicked: boolean
  [key: string]: boolean
}

export const initialState: InicialState = {
  pomodoro: true,
  short: false,
  long: false,
  wasClicked: false,
}

export type ButtonActionType = 'POMODORO' | 'SHORT' | 'LONG'
export type ButtonAction = { type: ButtonActionType }
type Reducer = (state: InicialState, action: ButtonAction) => InicialState

export const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'POMODORO':
      return {
        ...state,
        pomodoro: true,
        short: false,
        long: false,
        wasClicked: true,
      }
    case 'SHORT':
      return {
        ...state,
        pomodoro: false,
        short: true,
        long: false,
        wasClicked: true,
      }
    case 'LONG':
      return {
        ...state,
        pomodoro: false,
        short: false,
        long: true,
        wasClicked: true,
      }
    default:
      return state
  }
}
