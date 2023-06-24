import { createContext, useReducer } from 'react'
import { reducer } from './reducer'
import { SoundObject, State, initialState } from './initialState'
import { CustomizationActionTypes } from './types'

interface Props {
  children: React.ReactNode
}

export interface CustomizationContextType {
  customizationState: State
  customizationDispatch: React.Dispatch<{ type: CustomizationActionTypes; payload: string | SoundObject }>
}

export const CustomizationContext = createContext<CustomizationContextType | null>(null)

export const CustomizationProvider = ({ children }: Props) => {
  const [customizationState, customizationDispatch] = useReducer(reducer, initialState)

  return (
    <CustomizationContext.Provider value={{ customizationState, customizationDispatch }}>
      {children}
    </CustomizationContext.Provider>
  )
}
