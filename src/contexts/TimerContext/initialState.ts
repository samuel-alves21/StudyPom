import { standardValues } from '../../utilities/standardValues'

export type TimerState = typeof initialState

export const initialState = {
  pomodoroTime: standardValues.pomodoro,
  shortRestTime: standardValues.short,
  longRestTime: standardValues.long,
  cycles: standardValues.cycles,
  cyclesTemp: 0,
  cyclesFinished: 0,
  timeOnDisplay: 0,
  timeCounting: false,
  workedTime: 0,
  isDefault: false
}
