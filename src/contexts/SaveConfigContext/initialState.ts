import { SoundObject } from "../CustomizationContext"

export type InitialState = {
  StagedPomodoroTime: number
  StagedShortRestTime: number
  StagedLongRestTime: number
  StagedCycle: number
  shouldUpdateInputValue: boolean
  isSaved: boolean
  saveAlert: {
    shouldDisplay: boolean
    alertType: '' | 'timerRunning' | 'notSaved'
  }
  stagedSound: SoundObject
}

export const initialState = {
  StagedPomodoroTime: 0,
  StagedShortRestTime: 0,
  StagedLongRestTime: 0,
  StagedCycle: 0,
  shouldUpdateInputValue: true,
  isSaved: true,
  saveAlert: {
    shouldDisplay: false,
    alertType: '' as '' | 'timerRunning' | 'notSaved',
  },
  stagedSound: {
    name: '',
    start: '',
    end: '',
  },
}
