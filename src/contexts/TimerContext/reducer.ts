import { TimerState } from './initialState'
import { TimerActionTypes } from './types'

export type TimerReducer = (state: TimerState, action: TimerReducerAction) => TimerState

export interface TimerReducerAction {
  type: TimerActionTypes
  payload?: number | boolean
}

export const reducer: TimerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEFAULT':
      if (typeof action.payload !== 'boolean') return state
      return {
        ...state,
        isDefault: action.payload,
      }
    case 'CONFIG_CYCLES':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        cycles: action.payload,
      }
    case 'CONFIG_POMODORO_TIME':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        pomodoroTime: action.payload,
      }
    case 'CONFIG_SHORT_TIME':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        shortRestTime: action.payload,
      }
    case 'CONFIG_LONG_TIME':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        longRestTime: action.payload,
      }
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
    case 'RESET_STAGED_WORKED_TIME':
      return {
        ...state,
        stagedWorkedTime: state.workedTime,
      }
    case 'INCREASE_STAGED_WORKED_TIME':
      return {
        ...state,
        stagedWorkedTime: state.stagedWorkedTime + 1,
      }
    case 'SET_POMODORO_CONFIG_VALUE_INPUT':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        pomodoroConfigValueInput: action.payload,
      }
    case 'SET_SHORT_CONFIG_VALUE_INPUT':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        shortConfigValueInput: action.payload,
      }
    case 'SET_LONG_CONFIG_VALUE_INPUT':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        longConfigValueInput: action.payload,
      }
    case 'SET_CYCLES_CONFIG_VALUE_INPUT':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        cyclesConfigValueInput: action.payload,
      }
    case 'SET_IS_INPUT_VALUE_CHANGED':
      if (typeof action.payload !== 'boolean') return state
      return {
        ...state,
        isInputValueChanged: action.payload,
      }
    case 'RESET_ALL':
      return {
        ...state,
        stagedWorkedTime: state.workedTime,
        timeOnDisplay: state.pomodoroTime,
        timeCounting: false,
        cyclesTemp: 0,
      }
    default:
      return state
  }
}
