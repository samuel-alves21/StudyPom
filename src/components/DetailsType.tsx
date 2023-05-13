import styled from 'styled-components'
import { secondsToTime } from '../functions/secondsToTime'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { useContext } from 'react'

interface Props {
  text: string
}

export const DetailsType = ({ text }: Props) => {
  const { timeState } = useContext(TimerContext) as MyTimerContext

  return (
    <div>
      {text === 'time worked' ? (
        <P>
          Time worked: <span>{secondsToTime(timeState.workedTime)}</span>
        </P>
      ) : (
        <P>
          Cycles finished: <span>{timeState.cyclesFinished}</span>
        </P>
      )}
    </div>
  )
}

const P = styled.p`
  font-weight: bold;
`
