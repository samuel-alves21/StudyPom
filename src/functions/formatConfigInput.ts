import { Id } from '../types/types'
import { minutesToSeconds } from './minutesToSeconds'
import { secondsToMinutes } from './secondsToMinutes'
import { secondsToTime } from './secondsToTime'

export const formatConfigInput = (value: number, id: Id) => {
  if (id === 'pomodoro') return secondsToTime(minutesToSeconds(value))
  if (id === 'short') return secondsToMinutes(minutesToSeconds(value))
  if (id === 'long') return secondsToMinutes(minutesToSeconds(value))
  if (id === 'cycles') return value
}
