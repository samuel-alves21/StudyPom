import { createContext, useReducer } from 'react'
import { ReducerActionType, reducer } from './reducer'
import { InitialState, initialState } from './initialState'

interface SaveConfigProviderProps {
  children: React.ReactNode
}

export interface SaveConfigContextType {
  SaveConfigState: InitialState
  saveConfigDispatch: React.Dispatch<ReducerActionType>
}

export const SaveConfigContext = createContext<SaveConfigContextType | null>(null)

export const SaveConfigProvider = ({ children }: SaveConfigProviderProps) => {
  const [SaveConfigState, saveConfigDispatch] = useReducer(reducer, initialState)

  return (
    <SaveConfigContext.Provider value={{ SaveConfigState, saveConfigDispatch }}>{children}</SaveConfigContext.Provider>
  )
}
