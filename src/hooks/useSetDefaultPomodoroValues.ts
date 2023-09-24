import { useContext, useEffect } from 'react'
import { TimerContext, TimerContextType } from '../contexts/TimerContext'
import { ButtonContextType, ButtonsContext } from '../contexts/ButtonsContext'
import { UserContext, UserContextType } from '../contexts/UserContext'
import { standardValues } from '../utilities/standardValues'
import { getUserConfig } from '../firebase/getUserConfig'

export const useSetDefaultPomodoroValues = () => {
  const {
    timeState: { isDefault },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType

  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  const { userState } = useContext(UserContext) as UserContextType

  useEffect(() => {
    if (isDefault) {
      timeDispatch({ type: 'CONFIG_POMODORO_TIME', payload: standardValues.pomodoro })
      timeDispatch({ type: 'CONFIG_SHORT_TIME', payload: standardValues.short })
      timeDispatch({ type: 'CONFIG_LONG_TIME', payload: standardValues.long })
      timeDispatch({ type: 'CONFIG_CYCLES', payload: standardValues.cycles })
      timeDispatch({ type: 'RESET_ALL' })
      buttonDispatch({ type: 'CLICKED', payload: false })
      buttonDispatch({ type: 'POMODORO' })
    } else {
      if (!userState.pendentUser) {
        getUserConfig(userState.id, timeDispatch)
      }
    }
  }, [isDefault, timeDispatch, buttonDispatch, userState.id, userState.pendentUser])
}
