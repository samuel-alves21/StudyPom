import { FormsError } from './reducer'

export interface FormState {
  email: {
    hasError: boolean
    currentError: FormsError
    errorTypes: {
      exists: string
      empty: string
      invalid: string
      none: null
    }
  }
  username: {
    hasError: boolean
    currentError: FormsError
    errorTypes: {
      exists: string
      empty: string
      invalid: string
      none: null
    }
  }
  confirmedPassword: {
    hasError: boolean
    currentError: FormsError
    errorTypes: {
      mismatch: string
      empty: string
      none: null
    }
  }
  password: {
    hasError: boolean
    currentError: FormsError
    errorTypes: {
      uppercaseRequired: string
      lowercaseRequired: string
      specialCharRequired: string
      invalidLength: string
      empty: string
      none: null
    }
  }
}

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
