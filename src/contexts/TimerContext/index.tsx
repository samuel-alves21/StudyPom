import { createContext, useReducer } from 'react'
import { initialState, reducer } from './reducer'
import { TimerAction } from './reducer'

export interface MyTimerContext {
  timeState: typeof initialState
  timeDispatch: React.Dispatch<TimerAction>
}

interface Props {
  children: React.ReactNode
}

export const TimerContext = createContext<MyTimerContext | null>(null)

export const TimerProvider = (props: Props) => {
  const [timeState, timeDispatch] = useReducer(reducer, initialState)

  return (
    <TimerContext.Provider value={{ timeState, timeDispatch }}>
      {props.children}
    </TimerContext.Provider>
  )
}
