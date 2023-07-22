import styled from 'styled-components'
import { secondsToTime } from '../../../functions/secondsToTime'
import { TimerContext, TimerContextType } from '../../../contexts/TimerContext'
import { useContext } from 'react'

export interface DetailsProps {
  text: string
}

export const Details = ({ text }: DetailsProps) => {
  const { timeState } = useContext(TimerContext) as TimerContextType

  return (
    <div className='details'>
      {text === 'time worked' ? (
        <P className='time-worked'>
          Time worked: <span>{secondsToTime(timeState.workedTime)}</span>
        </P>
      ) : (
        <P className='cycles-finished'>
          Cycles finished: <span>{timeState.cyclesFinished}</span>
        </P>
      )}
    </div>
  )
}

const P = styled.p`
  font-weight: bold;
`
