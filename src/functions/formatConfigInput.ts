import { Id } from '../types/types'
import { secondsToMinutes } from './secondsToMinutes'
import { secondsToTime } from './secondsToTime'

export const formatConfigInput = (value: number, id: Id) => {
  if (id === 'pomodoro') return secondsToTime((value) * 60)
  if (id === 'short') return secondsToMinutes((value) * 60)
  if (id === 'long') return secondsToMinutes((value) * 60)
  if (id === 'cycles') return value
}
