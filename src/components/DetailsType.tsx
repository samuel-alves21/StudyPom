import styled from "styled-components"
import { secondsToTime } from "../functions/secondsToTime"
import { MyTimerContext, TimerContext } from "../contexts/TimerContext"
import  { useContext } from "react"

interface Props {
  text: string
}

export const DetailsType = (props: Props) => {
  const {timeState} = useContext(TimerContext) as MyTimerContext

  return (
    <div>
      {props.text === 'time worked' ? <P>Time worked: <span>{secondsToTime(0)}</span></P> : <P>Cycles finished: <span>{timeState.cyclesFinished}</span></P>}
    </div>
  )
}

const P = styled.p`
  font-size: 1.5rem;
  font-weight: bold;

  & span {
    
  }
`