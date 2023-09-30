import { createContext, useReducer } from 'react'
import { TimerReducerAction, reducer } from './reducer'
import { TimerState, initialState } from './initialState'

export interface TimerContextType {
  timeState: TimerState
  timeDispatch: React.Dispatch<TimerReducerAction>
}

interface TimerProviderProps {
  children: React.ReactNode
}

export const TimerContext = createContext<TimerContextType | null>(null)

export const TimerProvider = (props: TimerProviderProps) => {
  const [timeState, timeDispatch] = useReducer(reducer, initialState)

  return <TimerContext.Provider value={{ timeState, timeDispatch }}>{props.children}</TimerContext.Provider>
}
