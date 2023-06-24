import { useEffect, useContext } from 'react'
import { TimerContext, TimerContextType } from '../contexts/TimerContext'
import { ButtonContextType, ButtonsContext } from '../contexts/ButtonsContext'
import { verifyLimit } from '../functions/verifyLimit'
import { TimerActionTypes } from '../contexts/TimerContext/types'
import { Id } from '../types/types'

export const useTimerConfig = (state: string, id: Id) => {
  const {
    timeState: { pomodoroTime, shortRestTime, longRestTime, cycles },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType
  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  useEffect(() => {
    const timerValues = [pomodoroTime, shortRestTime, longRestTime, cycles]
    if (!timerValues.includes(Number(state))) {
      if (id !== 'cycles') {
        timeDispatch({
          type: `CONFIG_${id.toUpperCase()}_TIME` as TimerActionTypes,
          payload: verifyLimit(Number(state), id),
        })
      } else {
        timeDispatch({
          type: 'CONFIG_CYCLES',
          payload: verifyLimit(Number(state), id),
        })
      }
      timeDispatch({ type: 'RESET_ALL' })
      buttonDispatch({ type: 'CLICKED', payload: false })
      buttonDispatch({ type: 'POMODORO' })
    }
  }, [state, id, timeDispatch, buttonDispatch, pomodoroTime, shortRestTime, longRestTime, cycles])
}
