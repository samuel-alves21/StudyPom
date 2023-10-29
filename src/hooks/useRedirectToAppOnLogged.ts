import { useEffect } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const useRedirectToAppOnLogged = (setIsLoading: (isLoading: boolean) => void) => {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        navigate('/StudyPom')
      } else {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  })
}
