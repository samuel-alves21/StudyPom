import styled from 'styled-components'
import { TimerContext, TimerContextType } from '../../../contexts/TimerContext'
import { useInterval } from '../../../hooks/useInterval'
import { useContext, useCallback } from 'react'
import { ButtonsContext, ButtonContextType } from '../../../contexts/ButtonsContext'

export const CounterStartBtn = () => {
  const {
    timeState: { timeCounting },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType

  const { buttonState, buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  useInterval(
    () => {
      timeDispatch({ type: 'DECREASE_TIME', payload: 1 })
      if (buttonState.pomodoro) timeDispatch({ type: 'SET_WORKED_TIME', payload: 1 })
    },
    timeCounting ? 1000 : null
  )

  const handleClick = useCallback(() => {
    timeDispatch({ type: 'SET_TIME_COUNTING', payload: !timeCounting })
    buttonDispatch({ type: 'CLICKED', payload: true })
  }, [timeCounting, timeDispatch, buttonDispatch])

  return <ToggleButton onClick={handleClick}>{timeCounting ? 'Pause' : 'Start'}</ToggleButton>
}

export const ToggleButton = styled.button`
  background-color: white;
  color: black;
  transition: background-color 5s;
  transition: color 0.05s;

  &:hover {
    background-color: transparent;
    color: white;
  }
`
