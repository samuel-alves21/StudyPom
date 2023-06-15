import { createContext, useReducer } from 'react'
import { reducer } from './reducer'
import { State, initialState } from './initialState'

interface Props {
  children: React.ReactNode
}

export interface StylesContextType {
  stylesState: State
  stylesDispatch: React.Dispatch<{ type: 'CHANGE_BACKGROUND'; payload: string }>
}

export const StylesContext = createContext<StylesContextType | null>(null)

export const StylesProvider = ({ children }: Props) => {
  const [stylesState, stylesDispatch] = useReducer(reducer, initialState)

  return (
    <StylesContext.Provider value={{ stylesState, stylesDispatch }}>
      {children}
    </StylesContext.Provider>
  )
}
