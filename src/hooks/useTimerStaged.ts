import { useEffect, useContext } from 'react'
import { TimerContext, TimerContextType } from '../contexts/TimerContext'
import { ButtonContextType, ButtonsContext } from '../contexts/ButtonsContext'
import { verifyLimit } from '../functions/verifyLimit'
import { Id } from '../components/Timer/Counter/CounterOptionsBtn'
import { SaveConfigContext, SaveConfigContextType } from '../contexts/SaveConfigContext'
import { SaveConfigTypes } from '../contexts/SaveConfigContext/types'

export const useTimerStaged = (state: number, id: Id) => {
  const {
    timeDispatch,
    timeState: { isInputValueChanged },
  } = useContext(TimerContext) as TimerContextType

  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  const { saveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType

  useEffect(() => {
    if (isInputValueChanged) {
      if (id !== 'cycles') {
        saveConfigDispatch({
          type: `STAGE_${id.toUpperCase()}_TIME` as SaveConfigTypes,
          payload: verifyLimit(Number(state), id),
        })
        saveConfigDispatch({ type: 'SET_IS_SAVED', payload: false })
      } else {
        saveConfigDispatch({
          type: 'STAGE_CYCLES',
          payload: verifyLimit(Number(state), id),
        })
        saveConfigDispatch({ type: 'SET_IS_SAVED', payload: false })
      }
    }
  }, [state, id, timeDispatch, buttonDispatch, isInputValueChanged, saveConfigDispatch])
}
