import { FormReducer } from '../../types/types'

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
    default:
      return { ...state }
  }
}
