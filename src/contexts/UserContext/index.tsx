import { createContext, useState } from 'react'

interface UserProviderProps {
  children: React.ReactNode
}

export interface UserContextType {
  pendentUser: boolean
  setPendentUser: (user: boolean) => void
}

export const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [pendentUser, setPendentUser] = useState<boolean>(false)

  return <UserContext.Provider value={{ pendentUser, setPendentUser }}>{children}</UserContext.Provider>
}
