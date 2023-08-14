import { createContext, useState } from 'react'

export interface LoginContextType {
  isLogin: boolean
  setIsLogin: (value: boolean) => void
}

interface LoginProviderProps {
  children: React.ReactNode
}

export const LoginContext = createContext<LoginContextType | null>(null)

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLogin, setIsLogin] = useState(true)

  return <LoginContext.Provider value={{ isLogin, setIsLogin }}>{children}</LoginContext.Provider>
}
