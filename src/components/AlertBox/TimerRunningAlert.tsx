import { useContext } from 'react'
import { SaveConfigContext, SaveConfigContextType } from '../../contexts/SaveConfigContext'
import { TimerContext, TimerContextType } from '../../contexts/TimerContext'
import { UserContext, UserContextType } from '../../contexts/UserContext'
import { ButtonContextType, ButtonsContext } from '../../contexts/ButtonsContext'
import { standardValues } from '../../utilities/standardValues'
import { getUserConfig } from '../../firebase/getUserConfig'
import { setUserConfig } from '../../firebase/setUserConfig'

export const TimerRunningAlert = () => {
  const {
    SaveConfigState: { stagedCycle, stagedLongRestTime, stagedPomodoroTime, stagedShortRestTime },
    saveConfigDispatch,
  } = useContext(SaveConfigContext) as SaveConfigContextType

  const {
    timeDispatch,
    timeState: { isInputValueChanged, isDefault },
  } = useContext(TimerContext) as TimerContextType

  const { userState } = useContext(UserContext) as UserContextType

  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  const handleSaveConfig = async () => {
    if (!isInputValueChanged) {
      if (!isDefault) {
        saveConfigDispatch({ type: 'REMOVE_ALERT' })
        timeDispatch({ type: 'CONFIG_POMODORO_TIME', payload: standardValues.pomodoro })
        timeDispatch({ type: 'CONFIG_SHORT_TIME', payload: standardValues.short })
        timeDispatch({ type: 'CONFIG_LONG_TIME', payload: standardValues.long })
        timeDispatch({ type: 'CONFIG_CYCLES', payload: standardValues.cycles })
        timeDispatch({ type: 'RESET_ALL' })
        buttonDispatch({ type: 'CLICKED', payload: false })
        buttonDispatch({ type: 'POMODORO' })
        timeDispatch({ type: 'SET_DEFAULT', payload: !isDefault })
      } else {
        saveConfigDispatch({ type: 'REMOVE_ALERT' })
        timeDispatch({ type: 'RESET_ALL' })
        buttonDispatch({ type: 'CLICKED', payload: false })
        buttonDispatch({ type: 'POMODORO' })
        timeDispatch({ type: 'SET_DEFAULT', payload: !isDefault })
        if (!userState.pendentUser) {
          await getUserConfig(userState.id, timeDispatch)
        }
      }
    } else {
      saveConfigDispatch({ type: 'SET_IS_SAVED', payload: true })
      timeDispatch({ type: 'CONFIG_POMODORO_TIME', payload: stagedPomodoroTime })
      timeDispatch({ type: 'CONFIG_SHORT_TIME', payload: stagedShortRestTime })
      timeDispatch({ type: 'CONFIG_LONG_TIME', payload: stagedLongRestTime })
      timeDispatch({ type: 'CONFIG_CYCLES', payload: stagedCycle })
      timeDispatch({ type: 'RESET_ALL' })
      buttonDispatch({ type: 'CLICKED', payload: false })
      buttonDispatch({ type: 'POMODORO' })
      await setUserConfig(userState.id, stagedPomodoroTime, stagedShortRestTime, stagedLongRestTime, stagedCycle)
      saveConfigDispatch({ type: 'REMOVE_ALERT' })
    }
  }

  return (
    <>
      <h3>Timer is running, saving now will reset the timer</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleSaveConfig}>save</button>
        <button onClick={() => saveConfigDispatch({ type: 'REMOVE_ALERT' })}>cancel</button>
      </div>
    </>
  )
}
