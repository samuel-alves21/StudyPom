import { Id } from '../types/types'
import { limitValues } from '../utilities/limitValues'

export const acrementTime = (time: number, setting: Id) => {
  const step = 1
  if (setting === 'pomodoro') {
    if (time + step >= limitValues.max.pomodoro) return limitValues.max.pomodoro
    return time + step
  }

  if (setting === 'short') {
    if (time + step >= limitValues.max.short) return limitValues.max.short
    return time + step
  }

  if (setting === 'long') {
    if (time + step >= limitValues.max.long) return limitValues.max.long
    return time + step
  }

  if (setting === 'cycles') {
    if (time + 1 >= limitValues.max.cycles) return limitValues.max.cycles
    return time + 1
  }

  return time
}
