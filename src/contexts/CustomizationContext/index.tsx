import { createContext, useReducer } from 'react'
import { CustomizationAction, reducer } from './reducer'
import { CustomizationState, initialState } from './initialState'

export interface SoundObject {
  name: string
  start: string
  end: string
}

export interface CustomizationContextType {
  customizationState: CustomizationState
  customizationDispatch: React.Dispatch<CustomizationAction>
}

interface CustomizationProviderProps {
  children: React.ReactNode
}

export const CustomizationContext = createContext<CustomizationContextType | null>(null)

export const CustomizationProvider = ({ children }: CustomizationProviderProps) => {
  const [customizationState, customizationDispatch] = useReducer(reducer, initialState)

  return (
    <CustomizationContext.Provider value={{ customizationState, customizationDispatch }}>
      {children}
    </CustomizationContext.Provider>
  )
}
