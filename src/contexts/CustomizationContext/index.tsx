import { createContext, useReducer } from 'react'
import { reducer } from './reducer'
import { initialState } from './initialState'
import { CustomizationActionTypes, CustomizationContextState, ReactChildrenProps, SoundObject } from '../../types/types'

export interface CustomizationContextType {
  customizationState: CustomizationContextState
  customizationDispatch: React.Dispatch<{ type: CustomizationActionTypes; payload: string | SoundObject }>
}

export const CustomizationContext = createContext<CustomizationContextType | null>(null)

export const CustomizationProvider = ({ children }: ReactChildrenProps) => {
  const [customizationState, customizationDispatch] = useReducer(reducer, initialState)

  return (
    <CustomizationContext.Provider value={{ customizationState, customizationDispatch }}>
      {children}
    </CustomizationContext.Provider>
  )
}
