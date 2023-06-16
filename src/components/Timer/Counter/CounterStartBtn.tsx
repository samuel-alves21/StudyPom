import styled from 'styled-components'
import { TimerContext } from '../../../contexts/TimerContext'
import { useInterval } from '../../../hooks/useInterval'
import { useContext, useCallback } from 'react'
import { ButtonsContext, ButtonContext } from '../../../contexts/ButtonsContext'

export const CounterStartBtn = () => {
  const {
    timeState: { timeCounting },
    timeDispatch,
  } = useContext(TimerContext) as TimerContext

  const { buttonState, buttonDispatch } = useContext(
    ButtonsContext
  ) as ButtonContext

  useInterval(
    () => {
      timeDispatch({ type: 'DECREASE_TIME', payload: 1 })
      if (buttonState.pomodoro)
        timeDispatch({ type: 'SET_WORKED_TIME', payload: 1 })
    },
    timeCounting ? 1000 : null
  )

  const handleClick = useCallback(() => {
    timeDispatch({ type: 'SET_TIME_COUNTING', payload: !timeCounting })
    buttonDispatch({ type: 'CLICKED', payload: true })
  }, [timeCounting, timeDispatch, buttonDispatch])

  return (
    <ToggleButton onClick={handleClick}>
      {timeCounting ? 'Pause' : 'Start'}
    </ToggleButton>
  )
}

export const ToggleButton = styled.button`
  padding: 10px 40px;
  border: white solid 1px;
  border-radius: 20px;
  background-color: white;
  color: black;
  cursor: pointer;
  transition: background-color 5s;
  transition: color 0.05s;

  &:hover {
    background-color: transparent;
    color: white;
  }
`
