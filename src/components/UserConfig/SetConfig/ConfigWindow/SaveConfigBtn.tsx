import { useContext, useEffect } from 'react'
import { SaveConfigContext, SaveConfigContextType } from '../../../../contexts/SaveConfigContext'
import { setUserConfig } from '../../../../firebase/setUserConfig'
import { TimerContext, TimerContextType } from '../../../../contexts/TimerContext'
import { UserContext, UserContextType } from '../../../../contexts/UserContext'
import { ButtonContextType, ButtonsContext } from '../../../../contexts/ButtonsContext'
import { CustomizationContext, CustomizationContextType } from '../../../../contexts/CustomizationContext'
import { setUserCustomization } from '../../../../firebase/setUserCustomization'

export const SaveConfigBtn = () => {
  const {
    SaveConfigState: { StagedCycle, StagedLongRestTime, StagedPomodoroTime, StagedShortRestTime, isSaved, stagedSound },
    saveConfigDispatch,
  } = useContext(SaveConfigContext) as SaveConfigContextType

  const {
    timeState: { pomodoroTime, shortRestTime, longRestTime, cycles, timeCounting, isInputValueChanged },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType

  const { customizationDispatch, customizationState: { sound } } = useContext(CustomizationContext) as CustomizationContextType 

  const { userState } = useContext(UserContext) as UserContextType

  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  useEffect(() => {
    saveConfigDispatch({ type: 'STAGE_POMODORO_TIME', payload: pomodoroTime })
    saveConfigDispatch({ type: 'STAGE_SHORT_TIME', payload: shortRestTime })
    saveConfigDispatch({ type: 'STAGE_LONG_TIME', payload: longRestTime })
    saveConfigDispatch({ type: 'STAGE_CYCLES', payload: cycles })
    saveConfigDispatch({ type:  'STAGE_SOUND', payload: sound})
  }, [pomodoroTime, shortRestTime, longRestTime, cycles, saveConfigDispatch, sound])

  const handleClick = async () => {
    if (timeCounting && isInputValueChanged) {
      saveConfigDispatch({ type: 'SET_TIMER_RUNNING_ALERT' })
      return
    }

    if (isInputValueChanged) {
      timeDispatch({ type: 'CONFIG_POMODORO_TIME', payload: StagedPomodoroTime })
      timeDispatch({ type: 'CONFIG_SHORT_TIME', payload: StagedShortRestTime })
      timeDispatch({ type: 'CONFIG_LONG_TIME', payload: StagedLongRestTime })
      timeDispatch({ type: 'CONFIG_CYCLES', payload: StagedCycle })
      timeDispatch({ type: 'RESET_ALL' })
      buttonDispatch({ type: 'CLICKED', payload: false })
      buttonDispatch({ type: 'POMODORO' })
      timeDispatch({ type: 'SET_IS_INPUT_VALUE_CHANGED', payload: false})
    }
    
    customizationDispatch({ type: 'CHANGE_SOUND', payload: stagedSound })
    saveConfigDispatch({ type: 'SET_IS_SAVED', payload: true })

    await setUserConfig(userState.id, StagedPomodoroTime, StagedShortRestTime, StagedLongRestTime, StagedCycle)
    await setUserCustomization(userState.id, stagedSound)
  }

  return (
    <button disabled={isSaved} onClick={handleClick} className={isSaved ? 'disabled' : ''}>
      Save
    </button>
  )
}
