import { FormState } from '../../types/types'

export const initialState: FormState = {
  email: {
    hasError: false,
    currentError: 'none',
    errorTypes: {
      exists: 'email already exists!',
      empty: 'empty field!',
      invalid: 'email invalid!',
      none: null,
    },
  },
  username: {
    hasError: false,
    currentError: 'none',
    errorTypes: {
      exists: 'username already exists!',
      empty: 'empty field!',
      invalid: 'email invalid!',
      none: null,
    },
  },
  confirmedPassword: {
    hasError: false,
    currentError: 'none',
    errorTypes: {
      mismatch: 'password mismatch!',
      empty: 'empty field!',
      none: null,
    },
  },
  password: {
    hasError: false,
    currentError: 'none',
    errorTypes: {
      weakCase: 'password need to contain at least one uppercase letter',
      weakChar: 'password need to contain at least one special character',
      weakLength: 'password need to be at least 8 characters long',
      empty: 'empty field!',
      none: null,
    },
  },
}
