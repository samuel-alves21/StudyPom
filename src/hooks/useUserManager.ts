import { onAuthStateChanged } from 'firebase/auth'
import { useContext, useEffect } from 'react'
import { auth, database } from '../firebase/config'
import { ref, remove } from 'firebase/database'
import { UserContext, UserContextType } from '../contexts/UserContext'
import { TimerContext, TimerContextType } from '../contexts/TimerContext'
import { getUserConfig } from '../firebase/getUserConfig'

export const useUserManager = (setIsLoading: (value: boolean) => void) => {
  const {
    userState: { pendentUser },
    userDispatch,
  } = useContext(UserContext) as UserContextType

  const { timeDispatch } = useContext(TimerContext) as TimerContextType

  useEffect(() => {
    if (pendentUser) {
      setIsLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (!firebaseUser.emailVerified) {
          window.location.replace('/StudyPom/emailVerification/login')
        } else {
          try {
            await remove(ref(database, 'users/' + firebaseUser.uid + '/register'))
            await getUserConfig(firebaseUser, timeDispatch)
          } catch (error) {
            console.error(error)
          }
          userDispatch({ type: 'SET_EMAIL', payload: firebaseUser.email as string })
          userDispatch({ type: 'SET_ID', payload: firebaseUser.uid })
          userDispatch({ type: 'SET_USERNAME', payload: firebaseUser.displayName as string })
        }
        setIsLoading(false)
      } else {
        window.location.replace('/StudyPom/register')
      }
    })

    return () => {
      auth.signOut()
      unsubscribe()
      window.location.replace('/StudyPom/register')
    }
  }, [pendentUser, setIsLoading, userDispatch, timeDispatch])
}
