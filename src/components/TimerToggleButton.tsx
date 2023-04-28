import styled from 'styled-components'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { useInterval } from '../hooks/useInterval'
import { useContext, useCallback } from 'react'
import { ButtonsContext, MyButtonContext } from '../contexts/ButtonsContext'

export const TimerToggleButton = () => {
  const {
    timeState: { timeCounting },
    timeDispatch,
  } = useContext(TimerContext) as MyTimerContext

  const { buttonState, buttonDispatch } = useContext(
    ButtonsContext
  ) as MyButtonContext

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
    if (!buttonState.wasClicked) {
      buttonDispatch({ type: 'POMODORO' })
    }
  }, [timeCounting, timeDispatch, buttonState, buttonDispatch])

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
