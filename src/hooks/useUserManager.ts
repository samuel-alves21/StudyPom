import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth, database } from '../firebase/config'
import { ref, remove } from 'firebase/database'

export const useUserManager = (pendentUser: boolean, setIsLoading: (value: boolean) => void) => {
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
          await remove(ref(database, 'users/' + firebaseUser.uid + '/register'))
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
  }, [pendentUser, setIsLoading])
}
