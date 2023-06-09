import { standardValues } from '../../utilities/standardValues'

export type State = typeof initialState

export const initialState = {
  pomodoroTime: standardValues.pomodoro,
  shortRestTime: standardValues.shortBreak,
  longRestTime: standardValues.longBreak,
  cycles: standardValues.cycles,
  cyclesTemp: 0,
  cyclesFinished: 0,
  timeOnDisplay: 0,
  timeCounting: false,
  workedTime: 0,
}
