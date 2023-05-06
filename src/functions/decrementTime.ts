import { Id } from '../types/types'

export const decrementTime = (time: number, setting: Id) => {
  if (setting === 'pomodoro') {
    if (time - 5 <= 15) return 15
    return time - 5
  }

  if (setting === 'short') {
    if (time - 5 <= 5) return 5
    return time - 5
  }

  if (setting === 'long') {
    if (time - 5 <= 10) return 10
    return time - 5
  }

  if (setting === 'cycles') {
    if (time - 1 <= 0) return 1
    return time - 1
  }

  return time
}
