import styled from 'styled-components'
import { useContext } from 'react'
import { TimerContext } from '../../../contexts/TimerContext'
import { secondsToTime } from '../../../functions/secondsToTime'
import { breakpoints } from '../../../utilities/breakpoints'
import { secondsToMinutes } from '../../../functions/secondsToMinutes'
import { minutesToSeconds } from '../../../functions/minutesToSeconds'

export const Display = () => {

  const {
    timeState: { timeOnDisplay },
  } = useContext(TimerContext) as TimerContext
  console.log(timeOnDisplay)
  return <H1>{secondsToTime(minutesToSeconds(timeOnDisplay))}</H1>
}

const H1 = styled.h1`
  font-size: 7rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 5rem;
  }
`
