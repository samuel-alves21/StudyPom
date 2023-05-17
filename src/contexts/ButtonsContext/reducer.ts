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

export type ButtonActionType = 'POMODORO' | 'SHORT' | 'LONG' | 'CLICKED'
export type ButtonAction = { type: ButtonActionType; payload?: boolean }
type Reducer = (state: InicialState, action: ButtonAction) => InicialState

export const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'POMODORO':
      return {
        ...state,
        pomodoro: true,
        short: false,
        long: false,
      }
    case 'SHORT':
      return {
        ...state,
        pomodoro: false,
        short: true,
        long: false,
      }
    case 'LONG':
      return {
        ...state,
        pomodoro: false,
        short: false,
        long: true,
      }
    case 'CLICKED':
      if (typeof action.payload === 'undefined') return state
      return {
        ...state,
        wasClicked: action.payload,
      }
    default:
      return state
  }
}
