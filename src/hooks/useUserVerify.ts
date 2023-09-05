import { useEffect } from 'react'
import { auth } from '../firebase/config'
import { NavigateFunction } from 'react-router-dom'

export const useUserVerify = (navigate: NavigateFunction) => {
  useEffect(() => {
    if (auth.currentUser) {
      navigate('/')
    }
  }, [navigate])
}