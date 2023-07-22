import { FormState } from './initialState'
import { FormContextTypes } from './types'

export type FormsError =
  | 'none'
  | 'empty'
  | 'invalid'
  | 'exists'
  | 'invalidLength'
  | 'uppercaseRequired'
  | 'lowercaseRequired'
  | 'specialCharRequired'
  | 'mismatch'

export interface FormReducerAction {
  type: FormContextTypes
  payload: {
    setHasError: boolean
    setCurrentError: FormsError
  }
}

export type FormReducer = (state: FormState, action: FormReducerAction) => FormState

export const reducer: FormReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL_ERROR':
      return {
        ...state,
        email: {
          hasError: action.payload.setHasError,
          currentError: action.payload.setCurrentError,
          errorTypes: { ...state.email.errorTypes },
        },
      }
    case 'SET_USERNAME_ERROR':
      return {
        ...state,
        username: {
          hasError: action.payload.setHasError,
          currentError: action.payload.setCurrentError,
          errorTypes: { ...state.username.errorTypes },
        },
      }
    case 'SET_PASSWORD_ERROR':
      return {
        ...state,
        password: {
          hasError: action.payload.setHasError,
          currentError: action.payload.setCurrentError,
          errorTypes: { ...state.password.errorTypes },
        },
      }
    case 'SET_CONFIRMED_PASSWORD_ERROR':
      return {
        ...state,
        confirmedPassword: {
          hasError: action.payload.setHasError,
          currentError: action.payload.setCurrentError,
          errorTypes: { ...state.confirmedPassword.errorTypes },
        },
      }
    default:
      return { ...state }
  }
}
