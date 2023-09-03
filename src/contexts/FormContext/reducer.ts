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
  payload?: {
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
          shouldValidate: true,
          hasError: action.payload?.setHasError as boolean,
          currentError: action.payload?.setCurrentError as FormsError,
          errorTypes: { ...state.email.errorTypes },
        },
      }
    case 'SET_USERNAME_ERROR':
      return {
        ...state,
        username: {
          shouldValidate: true,
          hasError: action.payload?.setHasError as boolean,
          currentError: action.payload?.setCurrentError as FormsError,
          errorTypes: { ...state.username.errorTypes },
        },
      }
    case 'SET_PASSWORD_ERROR':
      return {
        ...state,
        password: {
          shouldValidate: true,
          hasError: action.payload?.setHasError as boolean,
          currentError: action.payload?.setCurrentError as FormsError,
          errorTypes: { ...state.password.errorTypes },
        },
      }
    case 'SET_CONFIRMED_PASSWORD_ERROR':
      return {
        ...state,
        confirmedPassword: {
          shouldValidate: true,
          hasError: action.payload?.setHasError as boolean,
          currentError: action.payload?.setCurrentError as FormsError,
          errorTypes: { ...state.confirmedPassword.errorTypes },
        },
      }
    case 'RESET':
      return {
        ...state,
        email: {
          shouldValidate: true,
          hasError: false,
          currentError: 'none',
          errorTypes: { ...state.email.errorTypes },
        },
        username: {
          shouldValidate: true,
          hasError: false,
          currentError: 'none',
          errorTypes: { ...state.username.errorTypes },
        },
        password: {
          shouldValidate: true,
          hasError: false,
          currentError: 'none',
          errorTypes: { ...state.password.errorTypes },
        },
        confirmedPassword: {
          shouldValidate: true,
          hasError: false,
          currentError: 'none',
          errorTypes: { ...state.confirmedPassword.errorTypes },
        },
      }
    default:
      return {
        ...state,
      }
  }
}
