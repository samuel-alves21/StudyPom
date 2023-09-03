import { signInWithEmailAndPassword } from 'firebase/auth'
import { FormReducerAction } from '../contexts/FormContext/reducer'
import { auth } from '../firebase/config'
import { isEmptyOnSubmit } from './formValidation'
import { NavigateFunction } from 'react-router-dom'
import { createUser } from '../firebase/createUser'
import { usernameVerify } from '../firebase/usernameVerify'

export interface FormData {
  [key: string]: string
}

type FormSubmitFn = (
  hasError: boolean,
  inputsArray: HTMLInputElement[],
  formDispatch: (value: FormReducerAction) => void,
  isLogin: boolean,
  navigate: NavigateFunction,
  setLoginError: (value: boolean) => void
) => void

export const formSubmit: FormSubmitFn = async (
  hasError,
  inputsArray,
  formDispatch,
  isLogin,
  navigate,
  setLoginError
) => {
  const spinner = document.getElementById('spinner') as HTMLDivElement
  spinner.style.display = 'flex'

  const formData = {} as FormData
  inputsArray.forEach((input) => {
    formData[input.id] = input.value
  })

  console.log('is login: ' + isLogin)
  console.log('has error: ' + hasError)

  if (!isLogin) {
    const isEmpty = isEmptyOnSubmit(inputsArray, formDispatch)
    if (!hasError && !isEmpty) {
      try {
        const usernameExists = await usernameVerify(formData.username)
        if (usernameExists) {
          formDispatch({ type: 'SET_USERNAME_ERROR', payload: { setHasError: true, setCurrentError: 'exists' } })
          spinner.style.display = 'none'
        } else {
          await createUser(formData.email, formData.password, formData.username)
          navigate('/')
        }
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          formDispatch({ type: 'SET_EMAIL_ERROR', payload: { setHasError: true, setCurrentError: 'exists' } })
        }
        console.log(error.code)
        spinner.style.display = 'none'
      }
    }
  } else {
    const isEmpty = isEmptyOnSubmit(inputsArray, formDispatch)
    if (!hasError && !isEmpty) {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
        navigate('/')
      } catch (error: any) {
        if (
          error.code === 'auth/invalid-email' ||
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found'
        ) {
          setLoginError(true)
        }
        spinner.style.display = 'none'
        console.log(error.code)
      }
    } else {
      console.error('form not sent')
    }
  }
  spinner.style.display = 'none'
}
