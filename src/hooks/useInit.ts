import { useContext, useEffect } from 'react'
import { TimerContext, TimerContextType } from '../contexts/TimerContext'
import { ButtonsContext, ButtonContextType } from '../contexts/ButtonsContext'

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
