import { FormInputType } from "../components/LoginContent/Form"
import { FormReducerAction } from "../contexts/FormContext/reducer"
import { FormContextTypes } from "../contexts/FormContext/types"

const idParser = (id: FormInputType) => {
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
export const formValidation = {
  emailVerify(email: string, formDispatch: (value: FormReducerAction) => void) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      formDispatch({ type: 'SET_EMAIL_ERROR', payload: { setHasError: true, setCurrentError: 'invalid' } })
      return true
    } else {
      formDispatch({ type: 'SET_EMAIL_ERROR', payload: { setHasError: false, setCurrentError: 'none' } })
      return false
    }
  },

  EmptyVerify(value: string, formDispatch: (value: FormReducerAction) => void, id: FormInputType) {
    const parsedId = idParser(id)
    if (value === '') {
      formDispatch({
        type: `SET_${parsedId.toUpperCase()}_ERROR` as FormContextTypes,
        payload: { setHasError: true, setCurrentError: 'empty' },
      })
      return true
    } else {
      formDispatch({
        type: `SET_${parsedId.toUpperCase()}_ERROR` as FormContextTypes,
        payload: { setHasError: false, setCurrentError: 'none' },
      })
      return false
    }
  },

  passwordVerify(password: string, formDispatch: (value: FormReducerAction) => void) {
    if (password.length < 8) {
      formDispatch({ type: 'SET_PASSWORD_ERROR', payload: { setHasError: true, setCurrentError: 'invalidLength' } })
      return true
    }
    if (!/^(?=.*[A-Z]).+$/.test(password)) {
      formDispatch({ type: 'SET_PASSWORD_ERROR', payload: { setHasError: true, setCurrentError: 'uppercaseRequired' } })
      return true
    }
    if (!/^(?=.*[a-z]).+$/.test(password)) {
      formDispatch({ type: 'SET_PASSWORD_ERROR', payload: { setHasError: true, setCurrentError: 'lowercaseRequired' } })
      return true
    }
    if (!/[!@#$%^&*()/+,.?":{}|<>]/.test(password)) {
      formDispatch({
        type: 'SET_PASSWORD_ERROR',
        payload: { setHasError: true, setCurrentError: 'specialCharRequired' },
      })
      return true
    }
    formDispatch({ type: 'SET_PASSWORD_ERROR', payload: { setHasError: false, setCurrentError: 'none' } })
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
      formDispatch({ type: 'SET_CONFIRMED_PASSWORD_ERROR', payload: { setHasError: false, setCurrentError: 'none' } })
      return false
    }
  },
}

export const formValidator = (
  value: string,
  id: FormInputType,
  passwordValue: string,
  formDispatch: (value: FormReducerAction) => void
) => {
  const isEmpty = formValidation.EmptyVerify(value, formDispatch, id)
  if (isEmpty) return
  if (id === 'email') {
    const isEmailInvalid = formValidation.emailVerify(value, formDispatch)
    if (isEmailInvalid) return
  }
  if (id === 'password') {
    const isPasswordInvalid = formValidation.passwordVerify(value, formDispatch)
    if (isPasswordInvalid) return
  }
  if (id === 'confirmedPassword') {
    const isConfirmedPasswordInvalid = formValidation.confirmedPasswordVerify(passwordValue, value, formDispatch)
    if (isConfirmedPasswordInvalid) return
  }
}
