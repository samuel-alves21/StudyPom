import { useContext } from "react"
import { SaveConfigContext, SaveConfigContextType } from "../../contexts/SaveConfigContext"
import { TimerContext, TimerContextType } from "../../contexts/TimerContext"
import { ButtonContextType, ButtonsContext } from "../../contexts/ButtonsContext"
import { TimerActionTypes } from "../../contexts/TimerContext/types"
import { ButtonsActionTypes } from "../../contexts/ButtonsContext/types"

export const WorkingAlert = () => {
  const { saveConfigDispatch, SaveConfigState: { saveAlert: { buttonId } } } = useContext(SaveConfigContext) as SaveConfigContextType
  const { timeDispatch, timeState: { workedTime } } = useContext(TimerContext) as TimerContextType 
  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType 

  const changeTimer = () => {
    timeDispatch({ type: `SET_${buttonId.toUpperCase()}_TIME` as TimerActionTypes })
    timeDispatch({ type: 'SET_TIME_COUNTING', payload: false })
    buttonDispatch({
      type: buttonId.toUpperCase() as ButtonsActionTypes,
    })
    timeDispatch({ type: 'RESET_STAGED_WORKED_TIME' })
    saveConfigDispatch({ type: 'REMOVE_ALERT' })
  }

  return (
    <>
      <h3>You're working, changing it now will reset the timer</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={changeTimer}>change</button>
        <button onClick={() => saveConfigDispatch({ type: 'REMOVE_ALERT' })}>cancel</button>
      </div>
    </>
  )
}