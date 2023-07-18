import { useContext, useEffect } from 'react'
import { TimerContext } from '../contexts/TimerContext'
import { ButtonsContext } from '../contexts/ButtonsContext'
import { ButtonContextType, TimerContextType } from '../types/types'

export const useInit = () => {
  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  const {
    timeState: { pomodoroTime },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType

  useEffect(() => {
    buttonDispatch({ type: 'POMODORO' })
    timeDispatch({ type: 'SET_POMODORO_TIME', payload: pomodoroTime })
  }, [pomodoroTime, timeDispatch, buttonDispatch])
}
