import { NavigateFunction } from 'react-router-dom'
import { FormReducerAction } from '../contexts/FormContext/reducer'
import { usernameVerify } from '../firebase/usernameVerify'
import { isEmptyOnSubmit } from './formValidation'
import { createUser } from '../firebase/createUser'
import { auth } from '../firebase/config'
import { User, sendEmailVerification } from 'firebase/auth'

interface FormData {
  [key: string]: string
}

type RegisterFn = (
  hasError: boolean,
  inputsArray: HTMLInputElement[],
  formDispatch: (value: FormReducerAction) => void,
  navigate: NavigateFunction
) => void

export const register: RegisterFn = async (hasError, inputsArray, formDispatch, navigate) => {
  const spinner = document.getElementById('spinner') as HTMLDivElement
  spinner.style.display = 'flex'

  const formData = {} as FormData
  inputsArray.forEach((input) => {
    formData[input.id] = input.value
  })

  const isEmpty = isEmptyOnSubmit(inputsArray, formDispatch)
  if (!hasError && !isEmpty) {
    try {
      const usernameExists = await usernameVerify(formData.username)
      if (usernameExists) {
        formDispatch({
          type: 'SET_USERNAME_ERROR',
          payload: { setHasError: true, setCurrentError: 'exists' },
        })

        spinner.style.display = 'none'
      } else {
        await createUser(formData.email, formData.password, formData.username)
        await sendEmailVerification(auth.currentUser as User)
        navigate('/StudyPom/emailVerification/register')
      }
      //eslint-disable-next-line
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        formDispatch({
          type: 'SET_EMAIL_ERROR',
          payload: { setHasError: true, setCurrentError: 'exists' },
        })
      } else {
        console.error(error)
      }
      spinner.style.display = 'none'
    }
  }
  spinner.style.display = 'none'
}
