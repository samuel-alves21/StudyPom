import { useContext } from 'react'
import { secondsToMinutes } from '../functions/secondsToMinutes'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import styled from 'styled-components'
import { TimerToggleButton } from './TimerToggleButton'

export const Timer = () => {
  const { timeState: { timeOnDisplay },} = useContext(TimerContext) as MyTimerContext

  return (
    <TimerWrapper>
      <Display>{secondsToMinutes(timeOnDisplay)}</Display>
      <TimerToggleButton />
    </TimerWrapper>
  )
}

const TimerWrapper = styled.div``

const Display = styled.h2`
  text-align: center;
  margin: 20px auto;
`
