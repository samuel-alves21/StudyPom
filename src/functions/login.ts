import { NavigateFunction } from 'react-router-dom'
import { FormReducerAction } from '../contexts/FormContext/reducer'
import { isEmptyOnSubmit } from './formValidation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, database } from '../firebase/config'
import { ref, set } from 'firebase/database'
import { AccessStateType } from '../contexts/AccessContext/initialState'
import { getIp } from './getIp'
import { setLoginAttempts } from '../firebase/setLoginAttempts'

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
      const ip = await getIp()
      await set(ref(database, `ips/${ip}`), {
        attempts: 0,
        date: Math.round(Date.now() / 1000),
      })
      if (!auth.currentUser?.emailVerified) {
        navigate('/StudyPom/emailVerification/login')
      } else {
        navigate('/StudyPom')
      }
    } catch (error: any) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        await setLoginAttempts(access)
        setLoginError(true)
      }
      spinner.style.display = 'none'
    }
  } else {
    try {
      await setLoginAttempts(access)
      console.error('form not sent')
    } catch (error) {
      console.error(error)
      console.error('form not sent')
    }
  }
  spinner.style.display = 'none'
}
