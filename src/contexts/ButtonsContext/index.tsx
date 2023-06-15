import { createContext, useReducer } from 'react'
import { ReducerAction, reducer } from './reducer'
import { State, initialState } from './initialState'

export interface ButtonContext {
  buttonState: State
  buttonDispatch: React.Dispatch<ReducerAction>
}

interface Props {
  children: React.ReactNode
}

export const ButtonsContext = createContext<ButtonContext | null>(null)

export const ButtonsProvider = (props: Props) => {
  const [buttonState, buttonDispatch] = useReducer(reducer, initialState)
  return (
    <ButtonsContext.Provider value={{ buttonState, buttonDispatch }}>
      {props.children}
    </ButtonsContext.Provider>
  )
}
