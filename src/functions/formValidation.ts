import { FormInputType } from '../components/Form'
import { FormState } from '../contexts/FormContext/initialState'
import { FormReducerAction } from '../contexts/FormContext/reducer'
import { FormContextTypes } from '../contexts/FormContext/types'

export const idParser = (id: FormInputType) => {
  let parsedId = ''
  for (const letter of id) {
    if (/[A-Z]/.test(letter)) {
      parsedId += '_' + letter.toLowerCase()
    } else {
      parsedId += letter
    }
  }
  return parsedId
}

export const hasErrorOnSubmit = (formState: FormState) => {
  const hasError =
    formState.email.hasError ||
    formState.password.hasError ||
    formState.username.hasError ||
    formState.confirmedPassword.hasError

  return hasError
}

export const isEmptyOnSubmit = (
  inputsArray: Array<HTMLInputElement>,
  formDispatch: (value: FormReducerAction) => void
) => {
  let isEmpty = false
  inputsArray.forEach((input) => {
    if (!input.value) {
      formValidation.EmptyVerify(input.value, formDispatch, input.id as FormInputType)
      isEmpty = true
    }
  })
  return isEmpty
}

export const getPasswordField = (id: FormInputType) => {
  let password = ''
  if (id === 'password') {
    const field = document.getElementById('confirmedPassword') as HTMLInputElement
    password = field?.value
  }
  if (id === 'confirmedPassword') {
    const field = document.getElementById('password') as HTMLInputElement
    password = field?.value
  }
  return password
}

export const formValidation = {
  usernameVerify(username: string, formDispatch: (value: FormReducerAction) => void) {
    if (username.length < 3) {
      formDispatch({
        type: 'SET_USERNAME_ERROR',
        payload: { setHasError: true, setCurrentError: 'minLength' },
      })
      return true
    }
    if (username.length > 15) {
      formDispatch({
        type: 'SET_USERNAME_ERROR',
        payload: { setHasError: true, setCurrentError: 'maxLength' },
      })
      return true
    }
    formDispatch({
      type: 'SET_USERNAME_ERROR',
      payload: { setHasError: false, setCurrentError: 'none' },
    })
    return false
  },

  emailVerify(email: string, formDispatch: (value: FormReducerAction) => void) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      formDispatch({
        type: 'SET_EMAIL_ERROR',
        payload: { setHasError: true, setCurrentError: 'invalid' },
      })
      return true
    }
    if (email.length > 100) {
      formDispatch({
        type: `SET_EMAIL_ERROR` as FormContextTypes,
        payload: { setHasError: true, setCurrentError: 'maxLength' },
      })
      return true
    }
    formDispatch({
      type: 'SET_EMAIL_ERROR',
      payload: { setHasError: false, setCurrentError: 'none' },
    })
    return false
  },

  EmptyVerify(value: string, formDispatch: (value: FormReducerAction) => void, id: FormInputType) {
    const parsedId = idParser(id)
    if (value === '') {
      formDispatch({
        type: `SET_${parsedId.toUpperCase()}_ERROR` as FormContextTypes,
        payload: { setHasError: true, setCurrentError: 'empty' },
      })
      return true
    }
    formDispatch({
      type: `SET_${parsedId.toUpperCase()}_ERROR` as FormContextTypes,
      payload: { setHasError: false, setCurrentError: 'none' },
    })
    return false
  },

  passwordVerify(password: string, formDispatch: (value: FormReducerAction) => void) {
    if (password.length < 8) {
      formDispatch({
        type: 'SET_PASSWORD_ERROR',
        payload: { setHasError: true, setCurrentError: 'invalidLength' },
      })
      return true
    }
    if (!/^(?=.*[A-Z]).+$/.test(password)) {
      formDispatch({
        type: 'SET_PASSWORD_ERROR',
        payload: { setHasError: true, setCurrentError: 'uppercaseRequired' },
      })
      return true
    }
    if (!/^(?=.*[a-z]).+$/.test(password)) {
      formDispatch({
        type: 'SET_PASSWORD_ERROR',
        payload: { setHasError: true, setCurrentError: 'lowercaseRequired' },
      })
      return true
    }
    if (/(.)\1{3}/.test(password)) {
      formDispatch({
        type: 'SET_PASSWORD_ERROR',
        payload: { setHasError: true, setCurrentError: 'hasSequentialChars' },
      })
      return true
    }
    if (!/[!@#$%^&*()/+,.?":{}|<>]/.test(password)) {
      formDispatch({
        type: 'SET_PASSWORD_ERROR',
        payload: { setHasError: true, setCurrentError: 'specialCharRequired' },
      })
      return true
    }
    formDispatch({
      type: 'SET_PASSWORD_ERROR',
      payload: { setHasError: false, setCurrentError: 'none' },
    })
    return false
  },

  confirmedPasswordVerify(
    password: string,
    confirmePassword: string,
    formDispatch: (value: FormReducerAction) => void
  ) {
    if (password !== confirmePassword) {
      formDispatch({
        type: 'SET_CONFIRMED_PASSWORD_ERROR',
        payload: { setHasError: true, setCurrentError: 'mismatch' },
      })

      return true
    } else {
      formDispatch({
        type: 'SET_CONFIRMED_PASSWORD_ERROR',
        payload: { setHasError: false, setCurrentError: 'none' },
      })
      return false
    }
  },
}

export const formValidator = (
  value: string,
  id: FormInputType,
  passwordValue: string,
  formDispatch: (value: FormReducerAction) => void,
  isLogin: boolean
) => {
  if (!isLogin) {
    const isEmpty = formValidation.EmptyVerify(value, formDispatch, id)
    if (isEmpty) return
    if (id === 'username') {
      const isUsernameInvalid = formValidation.usernameVerify(value, formDispatch)
      if (isUsernameInvalid) return
    }
    if (id === 'email') {
      const isEmailInvalid = formValidation.emailVerify(value, formDispatch)
      if (isEmailInvalid) return
    }
    if (id === 'password') {
      const isPasswordInvalid = formValidation.passwordVerify(value, formDispatch)
      const isConfirmedPasswordInvalid = formValidation.confirmedPasswordVerify(
        passwordValue,
        value,
        formDispatch
      )
      if (isPasswordInvalid || isConfirmedPasswordInvalid) return
    }
    if (id === 'confirmedPassword') {
      const isConfirmedPasswordInvalid = formValidation.confirmedPasswordVerify(
        passwordValue,
        value,
        formDispatch
      )
      if (isConfirmedPasswordInvalid) return
    }
  }
}
