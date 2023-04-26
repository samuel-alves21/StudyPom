export type TimerActionType =
  | 'SET_POMODORO_TIME'
  | 'SET_SHORT_TIME'
  | 'SET_LONG_TIME'
  | 'SET_CYCLES'
  | 'DECREASE_TIME'
  | 'SET_TIME_COUNTING'
  | 'SET_TIME_ON_DISPLAY'

export interface TimerAction {
  type: TimerActionType
  payload?: number | boolean
}

type Reducer = (
  state: typeof initialState,
  action: TimerAction
) => typeof initialState

export const initialState = {
  pomodoroTime: 5,
  shortRestTime: 3,
  longRestTime: 900,
  cycles: 0,
  timeOnDisplay: 5,
  timeCounting: false,
}

export const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POMODORO_TIME':
      return {
        ...state,
        timeOnDisplay: state.pomodoroTime,
      }
    case 'SET_SHORT_TIME':
      return {
        ...state,
        timeOnDisplay: state.shortRestTime,
      }
    case 'SET_LONG_TIME':
      return {
        ...state,
        timeOnDisplay: state.longRestTime,
      }
    case 'SET_CYCLES':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        cycles: action.payload,
      }
    case 'DECREASE_TIME':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        timeOnDisplay: state.timeOnDisplay - action.payload,
      }
    case 'SET_TIME_COUNTING':
      if (typeof action.payload !== 'boolean') return state
      return {
        ...state,
        timeCounting: action.payload,
      }
    case 'SET_TIME_ON_DISPLAY':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        timeOnDisplay: action.payload,
      }
    default:
      return state
  }
}
