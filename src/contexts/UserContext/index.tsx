import { createContext, useState } from 'react'

interface UserProviderProps {
  children: React.ReactNode
}

export interface UserState {
  username: string
  id: string
  email: string
  isLogedIn: boolean | 'pending'
}

const initialState = {
  username: '',
  id: '',
  email: '',
  isLogedIn: false,
}

export interface UserContextType {
  user: UserState
  setUser: (userObj: UserState) => void
}

export const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserState>(initialState)

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
