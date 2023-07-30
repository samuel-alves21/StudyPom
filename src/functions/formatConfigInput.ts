import { Id } from '../components/Timer/Counter/CounterOptionsBtn'
import { secondsToMinutes } from './secondsToMinutes'
import { secondsToTime } from './secondsToTime'

export const formatConfigInput = (value: number, id: Id) => {
  if (id === 'pomodoro') return secondsToTime(value)
  if (id === 'short') return secondsToMinutes(value)
  if (id === 'long') return secondsToMinutes(value)
  if (id === 'cycles') return value
}
