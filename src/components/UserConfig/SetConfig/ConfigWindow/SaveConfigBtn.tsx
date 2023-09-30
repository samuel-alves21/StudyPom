import { useContext, useEffect } from 'react'
import { SaveConfigContext, SaveConfigContextType } from '../../../../contexts/SaveConfigContext'
import { setUserConfig } from '../../../../firebase/setUserConfig'
import { TimerContext, TimerContextType } from '../../../../contexts/TimerContext'
import { UserContext, UserContextType } from '../../../../contexts/UserContext'
import { ButtonContextType, ButtonsContext } from '../../../../contexts/ButtonsContext'

export const SaveConfigBtn = () => {
  const {
    SaveConfigState: { StagedCycle, StagedLongRestTime, StagedPomodoroTime, StagedShortRestTime, isSaved },
    saveConfigDispatch,
  } = useContext(SaveConfigContext) as SaveConfigContextType

  const {
    timeState: { pomodoroTime, shortRestTime, longRestTime, cycles, timeCounting },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType

  const { userState } = useContext(UserContext) as UserContextType

  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  useEffect(() => {
    saveConfigDispatch({ type: 'STAGE_POMODORO_TIME', payload: pomodoroTime })
    saveConfigDispatch({ type: 'STAGE_SHORT_TIME', payload: shortRestTime })
    saveConfigDispatch({ type: 'STAGE_LONG_TIME', payload: longRestTime })
    saveConfigDispatch({ type: 'STAGE_CYCLES', payload: cycles })
  }, [pomodoroTime, shortRestTime, longRestTime, cycles, saveConfigDispatch])

  const handleClick = async () => {
    if (timeCounting) {
      saveConfigDispatch({ type: 'SET_TIMER_RUNNING_ALERT' })
      return
    }
    saveConfigDispatch({ type: 'SET_IS_SAVED', payload: true })
    timeDispatch({ type: 'CONFIG_POMODORO_TIME', payload: StagedPomodoroTime })
    timeDispatch({ type: 'CONFIG_SHORT_TIME', payload: StagedShortRestTime })
    timeDispatch({ type: 'CONFIG_LONG_TIME', payload: StagedLongRestTime })
    timeDispatch({ type: 'CONFIG_CYCLES', payload: StagedCycle })
    timeDispatch({ type: 'RESET_ALL' })
    buttonDispatch({ type: 'CLICKED', payload: false })
    buttonDispatch({ type: 'POMODORO' })
    await setUserConfig(userState.id, StagedPomodoroTime, StagedShortRestTime, StagedLongRestTime, StagedCycle)
  }

  return (
    <button disabled={isSaved} onClick={handleClick} className={isSaved ? 'disabled' : ''}>
      Save
    </button>
  )
}
