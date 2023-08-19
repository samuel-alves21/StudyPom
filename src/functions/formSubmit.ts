import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { FormReducerAction } from '../contexts/FormContext/reducer'
import { auth } from '../firebase/config'
import { isEmptyOnSubmit } from './formValidation'
import { NavigateFunction } from 'react-router-dom'
import { User } from '../contexts/UserContext'

type FormSubmitFn = (
  hasError: boolean,
  inputsArray: HTMLInputElement[],
  formDispatch: (value: FormReducerAction) => void,
  isLogin: boolean,
  navigate: NavigateFunction,
  userObj: User,
  setUser: (value: User) => void
) => void

export const formSubmit: FormSubmitFn = (hasError, inputsArray, formDispatch, isLogin, navigate, userObj, setUser) => {
  const spinner = document.getElementById('spinner') as HTMLDivElement
  spinner.style.display = 'flex'

  const data = {} as { [key: string]: string }
  inputsArray.forEach((input) => {
    data[input.id] = input.value
  })

  if (!isLogin) {
    const isEmpty = isEmptyOnSubmit(inputsArray, formDispatch)
    if (!hasError && !isEmpty) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          setUser({ ...userObj, email: data.email, id: user.uid, username: data.username, isLogedIn: true })
          navigate('/')
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            formDispatch({ type: 'SET_EMAIL_ERROR', payload: { setHasError: true, setCurrentError: 'exists' } })
          }
          console.log(error.code)
        })
      return
    } else {
      console.error('form not sent')
    }
  } else {
    const isEmpty = isEmptyOnSubmit(inputsArray, formDispatch)
    if (!hasError && !isEmpty) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          setUser({ ...userObj, email: data.email, id: user.uid, username: data.username, isLogedIn: true })
          navigate('/')
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
        })
      return
    } else {
      console.error('form not sent')
    }
  }
}
