import { NavigateFunction } from 'react-router-dom'
import { FormReducerAction } from '../contexts/FormContext/reducer'
import { isEmptyOnSubmit } from './formValidation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { AccessStateType } from '../contexts/AccessContext/initialState'
import { setAttemptsData } from '../firebase/setAttemptsData'
import { removeAttemptsData } from '../firebase/removeAttemptsData'

interface FormData {
  [key: string]: string
}

type LoginFn = (
  hasError: boolean,
  inputsArray: HTMLInputElement[],
  formDispatch: (value: FormReducerAction) => void,
  navigate: NavigateFunction,
  setLoginError: (value: boolean) => void,
  access: AccessStateType
) => void

export const login: LoginFn = async (hasError, inputsArray, formDispatch, navigate, setLoginError, access) => {
  const spinner = document.getElementById('spinner') as HTMLDivElement
  spinner.style.display = 'flex'

  const formData = {} as FormData
  inputsArray.forEach((input) => {
    formData[input.id] = input.value
  })

  const isEmpty = isEmptyOnSubmit(inputsArray, formDispatch)
  if (!hasError && !isEmpty) {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      await removeAttemptsData('login')
      navigate('/StudyPom')
      //eslint-disable-next-line
    } catch (error: any) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        await setAttemptsData(access.attempts, access.firstAttemptDate, 'login')
        setLoginError(true)
      }
      spinner.style.display = 'none'
    }
  } else {
    try {
      await setAttemptsData(access.attempts, access.firstAttemptDate, 'login')
      console.error('form not sent')
    } catch (error) {
      console.dir(error)
      console.error('form not sent')
    }
  }
  spinner.style.display = 'none'
}
