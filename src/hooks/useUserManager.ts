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
        console.log(firebaseUser.emailVerified)
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