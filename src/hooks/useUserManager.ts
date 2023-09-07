import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { auth } from "../firebase/config"

export const useUserManager = (pendentUser: boolean, setIsLoading: (value: boolean) => void) => {
  useEffect(() => {

    if (pendentUser) {
      setIsLoading(false)
      return
    }
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        if (!auth.currentUser?.emailVerified) {
          window.location.replace('/StudyPom/emailVerification/login')
        }
        setIsLoading(false)
      } else {
        window.location.replace('/StudyPom/register')
        setIsLoading(false)
      }
    })

    return () => {
      auth.signOut()
      unsubscribe()
      window.location.replace('/StudyPom/register')
    }

  }, [pendentUser, setIsLoading])
}