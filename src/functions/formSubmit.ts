import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { FormReducerAction } from '../contexts/FormContext/reducer'
import { auth, database } from '../firebase/config'
import { isEmptyOnSubmit } from './formValidation'
import { NavigateFunction } from 'react-router-dom'
import { User } from '../contexts/UserContext'
import { push, ref, set } from 'firebase/database'
import { usernameVerify } from '../firebase/usernameVerify'

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
      usernameVerify(data, spinner, formDispatch)  
        .then((usernameExists) => {
          console.log(usernameExists)
          if (!usernameExists) {
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
              const user = userCredential.user
              console.log(user)
              setUser({ ...userObj, email: data.email, id: user.uid, username: data.username, isLogedIn: true })
    
              set(ref(database, 'users/' + user.uid), {
                username: data.username,
                email: data.email,
                id: user.uid
              })
                .then(() => {
                  console.log('here')
                  set(push(ref(database, 'username/')), {
                    username: data.username,
                  }).then(() => {
                    console.log('here')
                    navigate('/')
                  })
                  .catch((error) => {
                    console.log(error)
                    spinner.style.display = 'none'
                  })
                })
                .catch((error) => {
                  console.log(error)
                  spinner.style.display = 'none'
                })
              .catch((error) => {
                console.log(error)
                spinner.style.display = 'none'
              })
            })
            .catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                formDispatch({ type: 'SET_EMAIL_ERROR', payload: { setHasError: true, setCurrentError: 'exists' } })
              }
              console.log(error.code)
              spinner.style.display = 'none'
            })
          }
        })
    } else {
      spinner.style.display = 'none'
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
          spinner.style.display = 'none'
        })
      return
    } else {
      console.error('form not sent')
    }
  }
}
