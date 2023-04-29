import styled from 'styled-components'
import { useContext } from 'react'
import { secondsToMinutes } from '../functions/secondsToMinutes'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'

export const Timer = () => {
  const {
    timeState: { timeOnDisplay },
  } = useContext(TimerContext) as MyTimerContext

  return <Display>{secondsToMinutes(timeOnDisplay)}</Display>
}

const Display = styled.h1`
  font-size: 7rem;
`
