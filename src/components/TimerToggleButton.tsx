import styled from 'styled-components'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { useInterval } from '../hooks/useInterval'
import { useContext } from 'react'

export const TimerToggleButton = () => {
  const {
    timeState: { timeCounting },
    timeDispatch,
  } = useContext(TimerContext) as MyTimerContext

  useInterval(
    () => {
      timeDispatch({ type: 'DECREASE_TIME', payload: 1 })
    },
    timeCounting ? 1000 : null
  )

  return (
    <ToggleButton
      onClick={() =>
        timeDispatch({ type: 'SET_TIME_COUNTING', payload: !timeCounting })
      }
    >
      {timeCounting ? 'Pause' : 'Start'}
    </ToggleButton>
  )
}

const ToggleButton = styled.button`
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
