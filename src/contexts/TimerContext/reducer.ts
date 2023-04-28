export type TimerActionType =
  | 'SET_POMODORO_TIME'
  | 'SET_SHORT_TIME'
  | 'SET_LONG_TIME'
  | 'DECREASE_TIME'
  | 'SET_TIME_COUNTING'
  | 'SET_TIME_ON_DISPLAY'
  | 'SET_CYCLES_TEMP'
  | 'SET_CYCLES_FINISHED'
  | 'SET_WORKED_TIME'
  | 'RESET_ALL'

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
  longRestTime: 4,
  cycles: 4,
  cyclesTemp: 0,
  cyclesFinished: 0,
  timeOnDisplay: 5,
  timeCounting: false,
  workedTime: 0,
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
    case 'SET_CYCLES_TEMP':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        cyclesTemp: action.payload,
      }
    case 'SET_CYCLES_FINISHED':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        cyclesFinished: state.cyclesFinished + action.payload,
      }
    case 'SET_WORKED_TIME':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        workedTime: state.workedTime + action.payload,
      }
    case 'RESET_ALL':
      return {
        ...state,
        workedTime: 0,
        cyclesFinished: 0,
        timeOnDisplay: state.pomodoroTime,
        timeCounting: false,
        cyclesTemp: 0,
      }
    default:
      return state
  }
}
