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
  | 'hasSequentialChars'
  | 'mismatch'
  | 'maxLength'
  | 'minLength'

export interface FormReducerAction {
  type: FormContextTypes
  payload: {
    setHasError: boolean
    setCurrentError: FormsError
    shouldValidate: boolean
  }
}

export type FormReducer = (state: FormState, action: FormReducerAction) => FormState

export const reducer: FormReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL_ERROR':
      return {
        ...state,
        email: {
          shouldValidate: action.payload.shouldValidate,
          hasError: action.payload.setHasError,
          currentError: action.payload.setCurrentError,
          errorTypes: { ...state.email.errorTypes },
        },
      }
    case 'SET_USERNAME_ERROR':
      return {
        ...state,
        username: {
          shouldValidate: action.payload.shouldValidate,
          hasError: action.payload.setHasError,
          currentError: action.payload.setCurrentError,
          errorTypes: { ...state.username.errorTypes },
        },
      }
    case 'SET_PASSWORD_ERROR':
      return {
        ...state,
        password: {
          shouldValidate: action.payload.shouldValidate,
          hasError: action.payload.setHasError,
          currentError: action.payload.setCurrentError,
          errorTypes: { ...state.password.errorTypes },
        },
      }
    case 'SET_CONFIRMED_PASSWORD_ERROR':
      return {
        ...state,
        confirmedPassword: {
          shouldValidate: action.payload.shouldValidate,
          hasError: action.payload.setHasError,
          currentError: action.payload.setCurrentError,
          errorTypes: { ...state.confirmedPassword.errorTypes },
        },
      }
    default:
      return { ...state }
  }
}
