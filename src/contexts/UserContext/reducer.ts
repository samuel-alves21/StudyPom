import { UserState } from "./initialState"
import { UserTypes } from "./types";

export interface UserAction {
  type: UserTypes
  payload: string | boolean
}

type UserReducer = (state: UserState, action: UserAction) => UserState

export const reducer: UserReducer  = (state, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      if (typeof action.payload !== 'string') return { ...state }
      return {
        ...state,
        userName: action.payload
      }
    case 'SET_EMAIL':
      if (typeof action.payload !== 'string') return { ...state }
      return {
        ...state,
        email: action.payload
      }
    case 'SET_ID':
      if (typeof action.payload !== 'string') return { ...state }
      return {
        ...state,
        id: action.payload
      }
    case 'SET_IS_PENDENT':
      if (typeof action.payload !== 'boolean') return { ...state }
      return {
        ...state,
        pendentUser: action.payload
      }
    default:
      return state;
  }
}