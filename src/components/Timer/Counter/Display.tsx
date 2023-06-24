import styled from 'styled-components'
import { useContext } from 'react'
import { TimerContext, TimerContextType } from '../../../contexts/TimerContext'
import { secondsToTime } from '../../../functions/secondsToTime'
import { breakpoints } from '../../../utilities/breakpoints'

export const Display = () => {
  const {
    timeState: { timeOnDisplay },
  } = useContext(TimerContext) as TimerContextType

  return <H1>{secondsToTime(timeOnDisplay)}</H1>
}

const H1 = styled.h1`
  font-size: 7rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 5rem;
  }
`
