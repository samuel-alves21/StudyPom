import { FormContextTypes, FormInputType, FormReducerAction } from '../types/types'

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
}
