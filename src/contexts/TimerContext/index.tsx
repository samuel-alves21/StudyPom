import { createContext, useReducer } from 'react'
import { reducer } from './reducer'
import { initialState } from './initialState'
import { ReactChildrenProps, TimerContextType } from '../../types/types'

export const TimerContext = createContext<TimerContextType | null>(null)

export const TimerProvider = (props: ReactChildrenProps) => {
  const [timeState, timeDispatch] = useReducer(reducer, initialState)

  return <TimerContext.Provider value={{ timeState, timeDispatch }}>{props.children}</TimerContext.Provider>
}
