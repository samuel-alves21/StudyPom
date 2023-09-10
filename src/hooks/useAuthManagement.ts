import { Unsubscribe, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth, database } from "../firebase/config"
import { onValue, ref } from "firebase/database"
import { getRegisterTimeout } from "../functions/getRegisterTimeout"
import { getRegisterWaitTime } from "../functions/getRegisterWaitTime"

interface RegisterState {
  clicks: number
  date: number
}

export const useAuthManagement = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [registerState, setRegisterState] = useState<null | RegisterState>(null)
  const [registerTimeout, setRegisterTimeout] = useState(0)
  const [registerWaitTime, setRegisterWaitTime] = useState(0)

  const timeLeft = registerWaitTime - registerTimeout

  useEffect(() => {
    window.document.title = 'StudyPom | Email Verification'
    let valueUnsubcribe: Unsubscribe

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (firebaseUser.emailVerified) {
          window.location.replace('/StudyPom')
        }
        valueUnsubcribe = onValue(ref(database, 'users/' + firebaseUser.uid + '/register'), (snapshot) => {
          setRegisterState(snapshot.val())
          if (snapshot.exists()) {
            setRegisterTimeout(getRegisterTimeout(snapshot.val().date))
          }
          setIsLoading(false)
        })
      } else {
        window.location.replace('/StudyPom/register')
      }
    })

    return () => {
      auth.signOut()
      unsubscribe()
      valueUnsubcribe()
    }
  }, [])

  useEffect(() => {
    const myInterval = setInterval(() => {
      setRegisterTimeout(registerTimeout + 1)
    }, 1000)
    if (timeLeft < 0) clearInterval(myInterval)
    return () => clearInterval(myInterval)
  }, [registerTimeout, registerWaitTime, timeLeft])

  useEffect(() => {
    if (registerState?.clicks) {
      setRegisterWaitTime(getRegisterWaitTime(registerState.clicks))
    }
    console.log(timeLeft)
  }, [registerState?.clicks, registerTimeout, registerWaitTime, timeLeft])

  const shouldSendEmail = timeLeft <= 0

  return {isLoading, shouldSendEmail, timeLeft, registerState}
}