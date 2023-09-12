import { AccessStateType } from './initialState'
import { AccessTypes } from './type'

export interface AccessActionType {
  type: AccessTypes
  payload?: number
}

export type AccessReducer = (state: AccessStateType, action: AccessActionType) => AccessStateType

export const reducer: AccessReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_ATTEMPTS':
      if (!action.payload) return state
      return {
        ...state,
        attempts: action.payload,
      }
    case 'RESET':
      return {
        ...state,
        attempts: 0,
      }
    case 'SET_DATE':
      if (!action.payload) return state
      return {
        ...state,
        date: action.payload,
      }
    default:
      return state
  }
}
