import { useContext, useEffect } from 'react'
import { TimerContext, TimerContextType } from '../contexts/TimerContext'
import { ButtonContextType, ButtonsContext } from '../contexts/ButtonsContext'
import { UserContext, UserContextType } from '../contexts/UserContext'
import { standardValues } from '../utilities/standardValues'
import { getUserConfig } from '../firebase/getUserConfig'
import { SaveConfigContext, SaveConfigContextType } from '../contexts/SaveConfigContext'

export const useSetDefaultPomodoroValues = () => {
  const {
    timeState: { isDefault },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType

  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  const { userState } = useContext(UserContext) as UserContextType

  const { saveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType

  useEffect(() => {
    const asyncFn = async () => {
      if (isDefault) {
        timeDispatch({ type: 'CONFIG_POMODORO_TIME', payload: standardValues.pomodoro })
        timeDispatch({ type: 'CONFIG_SHORT_TIME', payload: standardValues.short })
        timeDispatch({ type: 'CONFIG_LONG_TIME', payload: standardValues.long })
        timeDispatch({ type: 'CONFIG_CYCLES', payload: standardValues.cycles })
        timeDispatch({ type: 'RESET_ALL' })
        buttonDispatch({ type: 'CLICKED', payload: false })
        buttonDispatch({ type: 'POMODORO' })
        saveConfigDispatch({ type: 'REMOVE_ALERT' })
      } else {
        if (!userState.pendentUser) {
          await getUserConfig(userState.id, timeDispatch)
          timeDispatch({ type: 'RESET_ALL' })
          buttonDispatch({ type: 'CLICKED', payload: false })
          buttonDispatch({ type: 'POMODORO' })
          saveConfigDispatch({ type: 'REMOVE_ALERT' })
        }
      }
    }

    asyncFn()

  }, [isDefault, timeDispatch, buttonDispatch, userState.id, userState.pendentUser, saveConfigDispatch])
}
