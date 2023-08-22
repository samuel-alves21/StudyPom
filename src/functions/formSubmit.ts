import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { FormReducerAction } from '../contexts/FormContext/reducer'
import { auth } from '../firebase/config'
import { isEmptyOnSubmit } from './formValidation'
import { NavigateFunction } from 'react-router-dom'
import { usernameVerify } from '../firebase/usernameVerify'
import { userRegister } from '../firebase/userRegister'
import { User } from 'firebase/auth'
import { usernameRegister } from '../firebase/usernameRegister'
import { UserState } from '../contexts/UserContext'

export interface FormData {
  [key: string]: string
}

type FormSubmitFn = (
  hasError: boolean,
  inputsArray: HTMLInputElement[],
  formDispatch: (value: FormReducerAction) => void,
  isLogin: boolean,
  navigate: NavigateFunction,
  userObj: UserState,
  setUser: (value: UserState) => void,
  setLoginError: (value: boolean) => void
) => void

export const formSubmit: FormSubmitFn = async (
  hasError,
  inputsArray,
  formDispatch,
  isLogin,
  navigate,
  userObj,
  setUser,
  setLoginError
) => {
  const spinner = document.getElementById('spinner') as HTMLDivElement
  spinner.style.display = 'flex'

  const formData = {} as FormData
  inputsArray.forEach((input) => {
    formData[input.id] = input.value
  })

  if (!isLogin) {
    const isEmpty = isEmptyOnSubmit(inputsArray, formDispatch)
    if (!hasError && !isEmpty) {
      try {
        const usernameExists = await usernameVerify(formData)
        if (usernameExists) {
          formDispatch({ type: 'SET_USERNAME_ERROR', payload: { setHasError: true, setCurrentError: 'exists' } })
          spinner.style.display = 'none'
        } else {
          const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
          const firebaseUser: User = userCredential.user
          await userRegister(firebaseUser, formData)
          setUser({
            ...userObj,
            email: formData.email,
            id: firebaseUser.uid,
            username: formData.username,
            isLogedIn: true,
          })
          await usernameRegister(formData.username)
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
