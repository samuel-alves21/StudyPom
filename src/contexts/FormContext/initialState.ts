import { FormsError } from './reducer'

export interface FormState {
  email: {
    shouldValidate: boolean
    hasError: boolean
    currentError: FormsError
    errorTypes: {
      exists: string
      empty: string
      invalid: string
      maxLength: string
      none: null
    }
  }
  username: {
    shouldValidate: boolean
    hasError: boolean
    currentError: FormsError
    errorTypes: {
      exists: string
      empty: string
      invalid: string
      maxLength: string
      minLength: string
      none: null
    }
  }
  confirmedPassword: {
    shouldValidate: boolean
    hasError: boolean
    currentError: FormsError
    errorTypes: {
      mismatch: string
      empty: string
      none: null
    }
  }
  password: {
    shouldValidate: boolean
    hasError: boolean
    currentError: FormsError
    errorTypes: {
      hasSequentialChars: string
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
    shouldValidate: false,
    hasError: false,
    currentError: 'none',
    errorTypes: {
      exists: 'email already exists!',
      empty: 'empty field!',
      invalid: 'email invalid!',
      maxLength: 'email too long',
      none: null,
    },
  },
  username: {
    shouldValidate: false,
    hasError: false,
    currentError: 'none',
    errorTypes: {
      exists: 'username already exists!',
      empty: 'empty field!',
      invalid: 'email invalid!',
      maxLength: 'username too long',
      minLength: 'username too short',
      none: null,
    },
  },
  confirmedPassword: {
    shouldValidate: false,
    hasError: false,
    currentError: 'none',
    errorTypes: {
      mismatch: 'password mismatch!',
      empty: 'empty field!',
      none: null,
    },
  },
  password: {
    shouldValidate: false,
    hasError: false,
    currentError: 'none',
    errorTypes: {
      hasSequentialChars: 'no sequential characters allowed',
      uppercaseRequired: 'at least one uppercase letter required',
      lowercaseRequired: 'at least one lowercase  letter required',
      specialCharRequired: 'at least one special character required',
      invalidLength: 'at least 8 characters long required',
      empty: 'empty field!',
      none: null,
    },
  },
}
