import { ButtonsState } from './initialState'
import { ButtonsActionTypes } from './types'

export interface ButtonsReducerAction {
  type: ButtonsActionTypes
  payload?: boolean
}

export type ButtonsReducer = (state: ButtonsState, action: ButtonsReducerAction) => ButtonsState

export const reducer: ButtonsReducer = (state, action) => {
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
