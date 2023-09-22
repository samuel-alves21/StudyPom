import { useContext, useEffect } from 'react'
import { TimerContext, TimerContextType } from '../contexts/TimerContext'
import { ButtonContextType, ButtonsContext } from '../contexts/ButtonsContext'

export const useSetInitialTimer = () => {
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
