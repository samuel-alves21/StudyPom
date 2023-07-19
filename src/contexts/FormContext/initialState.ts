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
      uppercaseRequired: 'at least one uppercase letter required',
      lowercaseRequired: 'at least one lowercase  letter required',
      specialCharRequired: 'at least one special character required',
      invalidLength: 'at least 8 characters long required',
      empty: 'empty field!',
      none: null,
    },
  },
}
