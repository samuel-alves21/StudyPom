import { Id } from '../types/types'

export const acrementTime = (time: number, setting: Id) => {
  if (setting === 'pomodoro') {
    if (time + 5 >= 60) return 60
    return time + 5
  }

  if (setting === 'short') {
    if (time + 5 >= 10) return 10
    return time + 5
  }

  if (setting === 'long') {
    if (time + 5 >= 20) return 20
    return time + 5
  }

  if (setting === 'cycles') {
    if (time + 1 >= 8) return 8
    return time + 1
  }

  return time
}
