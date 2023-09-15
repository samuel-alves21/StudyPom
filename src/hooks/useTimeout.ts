import { Unsubscribe } from "firebase/auth"
import { useContext, useEffect, useState } from "react"
import { getIp } from "../functions/getIp"
import { onValue, ref } from "firebase/database"
import { database } from "../firebase/config"
import { getVerificationAndPasswordTimeout } from "../functions/getVerificationAndPAsswordTimeout"
import { AccessContext, AccessContextType } from "../contexts/AccessContext"
import { getLoginTimeout } from "../functions/getLoginTimeout"
import { currentDateInSeconds } from "../functions/currentDateInSeconds"

export const useTimeout = (isLogin: boolean, type: 'login' | 'password' | 'verification', setIsLoading: (isLoading: boolean) => void) => {
  const [attempts, setAttempts] = useState(0)
  const [lastAttemptDate, setLastAttemptDate] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isAllowed, setIsAllowed] = useState(false)

  const { accessDispatch, accessState } = useContext(AccessContext) as AccessContextType

  useEffect(() => {
    let unsubscribe: Unsubscribe
    const asyncFn = async () => {
      const ip = await getIp()
      unsubscribe = onValue(ref(database, `timeouts/${type}/ips/${ip}`), (snapshot) => {
        if (snapshot.exists()) {
          const values = snapshot.val()
          if (isLogin) {
            accessDispatch({ type: 'INCREMENT_ATTEMPTS', payload: values.attempts })
            accessDispatch({ type: 'SET_DATE', payload: values.date })
          } else {
            setAttempts(values.attempts)
            setLastAttemptDate(values.date)
          }
        }
        !!setIsLoading && setIsLoading(false)
      })
    }
    asyncFn()
    return () => unsubscribe && unsubscribe()
  }, [accessDispatch, isLogin, type, setIsLoading])

  useEffect(() => {
    let waitTime: number
    if (isLogin) {
      waitTime = getLoginTimeout(accessState.attempts) + accessState.date
    } else {
      waitTime = getVerificationAndPasswordTimeout(attempts) + lastAttemptDate
    }
    console.log(waitTime)
    const myInterval = setInterval(() => {
      setTimeLeft((waitTime - currentDateInSeconds()) <= 0 ? 0 : waitTime - currentDateInSeconds())
    }, 1000)

    setIsAllowed(waitTime <= currentDateInSeconds())

    return () => clearInterval(myInterval)
  }, [attempts, lastAttemptDate, timeLeft, isLogin, accessState.attempts, accessState.date])

  return { isAllowed, timeLeft, attempts }
}