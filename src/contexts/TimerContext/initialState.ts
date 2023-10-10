import { standardValues } from '../../utilities/standardValues'

export type TimerState = typeof initialState

export const initialState = {
  pomodoroTime: standardValues.pomodoro,
  shortRestTime: standardValues.short,
  longRestTime: standardValues.long,
  cycles: standardValues.cycles,
  cyclesTemp: 0,
  cyclesFinished: 0,
  timeOnDisplay: standardValues.pomodoro,
  timeCounting: false,
  workedTime: 0,
  stagedWorkedTime: 0,
  isDefault: false,
  pomodoroConfigValueInput: standardValues.pomodoro,
  shortConfigValueInput: standardValues.short,
  longConfigValueInput: standardValues.long,
  cyclesConfigValueInput: standardValues.cycles,
  isInputValueChanged: false,
}
