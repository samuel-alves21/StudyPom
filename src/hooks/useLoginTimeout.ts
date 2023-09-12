import { useContext, useEffect, useState } from "react"
import { AccessContext, AccessContextType } from "../contexts/AccessContext"
import { getTimeout } from "../functions/getTimeout"

export const useLoginTimeout = (isLogin: boolean) => {
  const [waitTime, setWaitTime] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isAllowed, setIsAllowed] = useState<boolean>(true)

  const { accessState } = useContext(AccessContext) as AccessContextType

  useEffect(() => {
    setWaitTime(getTimeout(accessState.attempts) + accessState.date)

    let myInterval: NodeJS.Timeout
    if (isLogin) {
      myInterval = setInterval(() => {
        setTimeLeft((waitTime - Math.round(Date.now() / 1000)) <= 0 ? 0 : waitTime - Math.round(Date.now() / 1000))
      }, 1000)
    }

    setIsAllowed(waitTime <= Math.round(Date.now() / 1000))

    return () => clearInterval(myInterval)
  }, [accessState.date, accessState.attempts, isLogin, setWaitTime, waitTime, isAllowed, timeLeft])

  return { isAllowed, timeLeft }
} 