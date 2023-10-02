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
    SaveConfigState: {
      stagedCycle,
      stagedLongRestTime,
      stagedPomodoroTime,
      stagedShortRestTime,
      isSaved,
      stagedSound,
      stagedColor,
    },
    saveConfigDispatch,
  } = useContext(SaveConfigContext) as SaveConfigContextType

  const {
    timeState: { pomodoroTime, shortRestTime, longRestTime, cycles, timeCounting, isInputValueChanged },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType

  const {
    customizationDispatch,
    customizationState: { sound, mainColor },
  } = useContext(CustomizationContext) as CustomizationContextType

  const { userState } = useContext(UserContext) as UserContextType

  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  useEffect(() => {
    saveConfigDispatch({ type: 'STAGE_POMODORO_TIME', payload: pomodoroTime })
    saveConfigDispatch({ type: 'STAGE_SHORT_TIME', payload: shortRestTime })
    saveConfigDispatch({ type: 'STAGE_LONG_TIME', payload: longRestTime })
    saveConfigDispatch({ type: 'STAGE_CYCLES', payload: cycles })
    saveConfigDispatch({ type: 'STAGE_SOUND', payload: sound })
    saveConfigDispatch({ type: 'STAGE_COLOR', payload: mainColor })
  }, [pomodoroTime, shortRestTime, longRestTime, cycles, saveConfigDispatch, sound, mainColor])

  const handleClick = async () => {
    if (timeCounting && isInputValueChanged) {
      saveConfigDispatch({ type: 'SET_TIMER_RUNNING_ALERT' })
      return
    }

    if (isInputValueChanged) {
      timeDispatch({ type: 'CONFIG_POMODORO_TIME', payload: stagedPomodoroTime })
      timeDispatch({ type: 'CONFIG_SHORT_TIME', payload: stagedShortRestTime })
      timeDispatch({ type: 'CONFIG_LONG_TIME', payload: stagedLongRestTime })
      timeDispatch({ type: 'CONFIG_CYCLES', payload: stagedCycle })
      timeDispatch({ type: 'RESET_ALL' })
      buttonDispatch({ type: 'CLICKED', payload: false })
      buttonDispatch({ type: 'POMODORO' })
      timeDispatch({ type: 'SET_IS_INPUT_VALUE_CHANGED', payload: false })
    }

    customizationDispatch({ type: 'CHANGE_SOUND', payload: stagedSound })
    customizationDispatch({ type: 'CHANGE_MAIN_COLOR', payload: stagedColor })
    saveConfigDispatch({ type: 'SET_IS_SAVED', payload: true })

    await setUserConfig(userState.id, stagedPomodoroTime, stagedShortRestTime, stagedLongRestTime, stagedCycle)
    await setUserCustomization(userState.id, stagedSound, stagedColor)
  }

  return (
    <button disabled={isSaved} onClick={handleClick} className={isSaved ? 'disabled' : ''}>
      Save
    </button>
  )
}
