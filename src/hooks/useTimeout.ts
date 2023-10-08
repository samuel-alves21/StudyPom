import { Unsubscribe } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { getIp } from '../functions/getIp'
import { onValue, ref } from 'firebase/database'
import { database } from '../firebase/config'
import { getVerificationAndPasswordTimeout } from '../functions/getVerificationAndPasswordTimeout'
import { AccessContext, AccessContextType } from '../contexts/AccessContext'
import { getLoginTimeout } from '../functions/getLoginTimeout'
import { currentDateInSeconds } from '../functions/currentDateInSeconds'
import { setFirstAttemptDate } from '../firebase/setFirstAttemptDate'
import { timeoutExpireTime } from '../utilities/timeoutExpireTime'
import { removeAttemptsData } from '../firebase/removeAttemptsData'

export const useTimeout = (isLogin: boolean, type: 'login' | 'password' | 'verification') => {
  const [attempts, setAttempts] = useState(0)
  const [lastAttemptDate, setLastAttemptDate] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isAllowed, setIsAllowed] = useState(false)
  const [firstAttemptState, setFirstAttemptState] = useState(0)

  const { accessDispatch, accessState } = useContext(AccessContext) as AccessContextType

  useEffect(() => {
    let unsubscribe: Unsubscribe
    const asyncFn = async () => {
      try {
        const ip = await getIp()
        unsubscribe = onValue(ref(database, `timeouts/${type}/ips/${ip}`), async (snapshot) => {
          if (snapshot.exists()) {
            const values = snapshot.val()
            if (values.attempts === 1) {
              await setFirstAttemptDate(type, ip, values)
            }
            if (values.firstAttemptDate + timeoutExpireTime < currentDateInSeconds()) {
              await removeAttemptsData(type)
            }
            if (isLogin) {
              accessDispatch({ type: 'SET_ATTEMPTS', payload: values.attempts })
              accessDispatch({ type: 'SET_DATE', payload: values.date })
              accessDispatch({ type: 'SET_FIRST_ATTEMPT', payload: values.firstAttemptDate })
            } else {
              setAttempts(values.attempts)
              setLastAttemptDate(values.date)
              setFirstAttemptState(values.firstAttemptDate)
            }
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
    asyncFn()
    return () => unsubscribe && unsubscribe()
  }, [accessDispatch, isLogin, type])

  useEffect(() => {
    let waitTime: number
    if (isLogin) {
      waitTime = getLoginTimeout(accessState.attempts) + accessState.date
    } else {
      waitTime = getVerificationAndPasswordTimeout(attempts) + lastAttemptDate
    }

    const myInterval = setInterval(() => {
      setTimeLeft(waitTime - currentDateInSeconds() <= 0 ? 0 : waitTime - currentDateInSeconds())
    }, 1000)

    setIsAllowed(waitTime <= currentDateInSeconds())

    return () => clearInterval(myInterval)
  }, [attempts, lastAttemptDate, timeLeft, isLogin, accessState.attempts, accessState.date])

  return { isAllowed, timeLeft, attempts, firstAttemptState }
}
