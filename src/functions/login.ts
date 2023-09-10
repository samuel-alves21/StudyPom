import { NavigateFunction } from "react-router-dom"
import { FormReducerAction } from "../contexts/FormContext/reducer"
import { isEmptyOnSubmit } from "./formValidation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/config"

interface FormData {
  [key: string]: string
}

type LoginFn = (
  hasError: boolean,
  inputsArray: HTMLInputElement[],
  formDispatch: (value: FormReducerAction) => void,
  navigate: NavigateFunction,
  setLoginError: (value: boolean) => void
) => void

export const login: LoginFn = async (
  hasError,
  inputsArray,
  formDispatch,
  navigate,
  setLoginError
) => {
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
        setLoginError(true)
      }
      spinner.style.display = 'none'
    }
  } else {
    console.error('form not sent')
  }
  spinner.style.display = 'none'
}



