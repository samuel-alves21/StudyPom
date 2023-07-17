import { FormState } from '../../types/types'

export const initialState: FormState = {
  email: {
    hasError: false,
    currentError: 'none',
    errorTypes: {
      empty: 'empty field!',
      invalid: 'email invalid!',
      none: null,
    },
  },
  username: {
    hasError: false,
    currentError: 'none',
    errorTypes: {
      empty: 'empty field!',
      invalid: 'email invalid!',
      none: null,
    },
  },
  confirmedPassword: {
    hasError: false,
    currentError: 'none',
    errorTypes: {
      empty: 'empty field!',
      invalid: 'email invalid!',
      none: null,
    },
  },
  password: {
    hasError: false,
    currentError: 'none',
    errorTypes: {
      empty: 'empty field!',
      invalid: 'email invalid!',
      none: null,
    },
  },
}
