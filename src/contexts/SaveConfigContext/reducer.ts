import { InitialState } from './initialState'
import { SaveConfigTypes } from './types'

export interface ReducerActionType {
  type: SaveConfigTypes
  payload?: number | boolean
}

type Reducer = (state: InitialState, action: ReducerActionType) => InitialState

export const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'STAGE_POMODORO_TIME':
      if (typeof action.payload !== 'number') return { ...state }
      return { ...state, StagedPomodoroTime: action.payload }
    case 'STAGE_SHORT_TIME':
      if (typeof action.payload !== 'number') return { ...state }
      return { ...state, StagedShortRestTime: action.payload }
    case 'STAGE_LONG_TIME':
      if (typeof action.payload !== 'number') return { ...state }
      return { ...state, StagedLongRestTime: action.payload }
    case 'STAGE_CYCLES':
      if (typeof action.payload !== 'number') return { ...state }
      return { ...state, StagedCycle: action.payload }
    case 'SET_SHOULD_UPDATE_INPUT_VALUE':
      if (typeof action.payload !== 'boolean') return { ...state }
      return { ...state, shouldUpdateInputValue: action.payload }
    case 'SET_IS_SAVED':
      if (typeof action.payload !== 'boolean') return { ...state }
      return { ...state, isSaved: action.payload }
    case 'SET_NOT_SAVED_ALERT':
      return {
        ...state,
        saveAlert: { ...state.saveAlert, shouldDisplay: true, alertType: 'notSaved' },
      }
    case 'SET_TIMER_RUNNING_ALERT':
      return {
        ...state,
        saveAlert: { ...state.saveAlert, shouldDisplay: true, alertType: 'timerRunning' },
      }
    case 'REMOVE_ALERT':
      return { ...state, saveAlert: { ...state.saveAlert, shouldDisplay: false, alertType: '' } }
    default:
      return { ...state }
  }
}
