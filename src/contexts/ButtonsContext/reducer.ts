import { State } from './initialState'
import { ButtonsActionTypes } from './types'

export interface ReducerAction {
  type: ButtonsActionTypes
  payload?: boolean
}
type Reducer = (state: State, action: ReducerAction) => State

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
