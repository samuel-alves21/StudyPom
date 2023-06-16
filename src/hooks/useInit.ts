import { useContext, useEffect } from 'react'
import { TimerContext } from '../contexts/TimerContext'
import { ButtonsContext, ButtonContext } from '../contexts/ButtonsContext'

export const useInit = () => {
  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContext

  const {
    timeState: { pomodoroTime },
    timeDispatch,
  } = useContext(TimerContext) as TimerContext

  useEffect(() => {
    buttonDispatch({ type: 'POMODORO' })
    timeDispatch({ type: 'SET_POMODORO_TIME', payload: pomodoroTime })
  }, [pomodoroTime, timeDispatch, buttonDispatch])
}
