import { createContext, useReducer } from 'react'
import { reducer } from './reducer'
import { initialState } from './initialState'
import { ButtonContextType, ReactChildrenProps } from '../../types/types'

export const ButtonsContext = createContext<ButtonContextType | null>(null)

export const ButtonsProvider = (props: ReactChildrenProps) => {
  const [buttonState, buttonDispatch] = useReducer(reducer, initialState)
  return <ButtonsContext.Provider value={{ buttonState, buttonDispatch }}>{props.children}</ButtonsContext.Provider>
}
