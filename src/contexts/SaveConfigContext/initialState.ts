import { SoundObject } from '../CustomizationContext'

type alertType = '' | 'timerRunning' | 'notSaved' | 'working' | 'signIn'
export type buttonId = '' | 'pomodoro' | 'short' | 'long'

export type InitialState = {
  stagedPomodoroTime: number
  stagedShortRestTime: number
  stagedLongRestTime: number
  stagedCycle: number
  shouldUpdateInputValue: boolean
  isSaved: boolean
  saveAlert: {
    shouldDisplay: boolean
    alertType: alertType
    buttonId: buttonId
  }
  stagedSound: SoundObject
  stagedVolume: string
  stagedColor: string
  stagedBright: string
  stagedBlur: string
}

export const initialState: InitialState = {
  stagedPomodoroTime: 0,
  stagedShortRestTime: 0,
  stagedLongRestTime: 0,
  stagedCycle: 0,
  shouldUpdateInputValue: true,
  isSaved: true,
  saveAlert: {
    shouldDisplay: false,
    alertType: '' as alertType,
    buttonId: '' as buttonId,
  },
  stagedSound: {
    name: '',
    start: '',
    end: '',
  },
  stagedColor: '',
  stagedVolume: '',
  stagedBright: '1',
  stagedBlur: '1',
}
