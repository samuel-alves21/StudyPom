import { createContext, useReducer } from 'react'
import { reducer, ReducerAction } from './reducer'
import { State, initialState } from './initialState'

export interface TimerContextType {
  timeState: State
  timeDispatch: React.Dispatch<ReducerAction>
}

interface Props {
  children: React.ReactNode
}

export const TimerContext = createContext<TimerContextType | null>(null)

export const TimerProvider = (props: Props) => {
  const [timeState, timeDispatch] = useReducer(reducer, initialState)

  return <TimerContext.Provider value={{ timeState, timeDispatch }}>{props.children}</TimerContext.Provider>
}
