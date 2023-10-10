import { createContext, useReducer } from 'react'
import { UserState, initialState } from './initialState'
import { UserAction, reducer } from './reducer'

interface UserProviderProps {
  children: React.ReactNode
}

export interface UserContextType {
  userState: UserState
  userDispatch: React.Dispatch<UserAction>
}

export const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userState, userDispatch] = useReducer(reducer, initialState)

  return <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>
}
