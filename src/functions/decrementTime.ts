import { Id } from '../types/types'
import { limitValues } from '../utilities/limitValues'

export const decrementTime = (time: number, setting: Id) => {
  const step = 60
  if (setting === 'pomodoro') {
    if (time - step <= limitValues.min.pomodoro) return limitValues.min.pomodoro
    return time - step
  }

  if (setting === 'short') {
    if (time - step <= limitValues.min.short) return limitValues.min.short
    return time - step
  }

  if (setting === 'long') {
    if (time - step <= limitValues.min.long) return limitValues.min.long
    return time - step
  }

  if (setting === 'cycles') {
    if (time - step <= limitValues.min.cycles) return limitValues.min.cycles
    return time - 1
  }

  return time
}
