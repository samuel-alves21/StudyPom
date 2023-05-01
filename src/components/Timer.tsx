import styled from 'styled-components'
import { useContext } from 'react'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { secondsToTime } from '../functions/secondsToTime'

export const Timer = () => {
  const {
    timeState: { timeOnDisplay },
  } = useContext(TimerContext) as MyTimerContext

  return <Display>{secondsToTime(timeOnDisplay)}</Display>
}

const Display = styled.h1`
  font-size: 7rem;

  @media (max-width: 430px) {
    font-size: 5rem;
  }
`
