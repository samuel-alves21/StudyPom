import { useEffect, useContext } from 'react'
import { TimerContext, TimerContextType } from '../contexts/TimerContext'
import { ButtonContextType, ButtonsContext } from '../contexts/ButtonsContext'
import { verifyLimit } from '../functions/verifyLimit'
import { Id } from '../components/Timer/Counter/CounterOptionsBtn'
import { SaveConfigContext, SaveConfigContextType } from '../contexts/SaveConfigContext'
import { SaveConfigTypes } from '../contexts/SaveConfigContext/types'

export const useTimerStaged = (state: string, id: Id, isChanged: boolean) => {
  const { timeDispatch } = useContext(TimerContext) as TimerContextType
  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  const { SaveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType

  useEffect(() => {
    console.log(isChanged)
    if (isChanged) {
      if (id !== 'cycles') {
        SaveConfigDispatch({
          type: `STAGE_${id.toUpperCase()}_TIME` as SaveConfigTypes,
          payload: verifyLimit(Number(state), id),
        })
        SaveConfigDispatch({ type: 'SET_IS_SAVED', payload: false })
      } else {
        SaveConfigDispatch({
          type: 'STAGE_CYCLES',
          payload: verifyLimit(Number(state), id),
        })
        SaveConfigDispatch({ type: 'SET_IS_SAVED', payload: false })
      }
    }
  }, [state, id, timeDispatch, buttonDispatch, isChanged, SaveConfigDispatch])
}
