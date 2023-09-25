import { createContext, useReducer } from 'react'
import { ButtonsReducerAction, reducer } from './reducer'
import { ButtonsState, initialState } from './initialState'

export interface ButtonContextType {
  buttonState: ButtonsState
  buttonDispatch: React.Dispatch<ButtonsReducerAction>
}

interface ButtonsProviderProps {
  children: React.ReactNode
}

export const ButtonsContext = createContext<ButtonContextType | null>(null)

export const ButtonsProvider = (props: ButtonsProviderProps) => {
  const [buttonState, buttonDispatch] = useReducer(reducer, initialState)
  return (
    <ButtonsContext.Provider value={{ buttonState, buttonDispatch }}>
      {props.children}
    </ButtonsContext.Provider>
  )
}
