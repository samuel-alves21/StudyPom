import { createContext, useReducer } from 'react'
import { AccessActionType, reducer } from './reducer'
import { AccessStateType, initialState } from './initialState'

interface AccessProviderProps {
  children: React.ReactNode
}

export interface AccessContextType {
  accessState: AccessStateType
  accessDispatch: React.Dispatch<AccessActionType>
}

export const AccessContext = createContext<AccessContextType | null>(null)

export const AccessProvider = ({ children }: AccessProviderProps) => {
  const [accessState, accessDispatch] = useReducer(reducer, initialState)

  return (
    <AccessContext.Provider value={{ accessState, accessDispatch }}>
      {children}
    </AccessContext.Provider>
  )
}
