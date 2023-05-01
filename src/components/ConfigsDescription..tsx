import styled from 'styled-components'
import { useContext } from 'react'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { secondsToMinutes } from '../functions/secondsToMinutes'
import { secondsToTime } from '../functions/secondsToTime'

export const ConfigDescription = () => {
  const { timeState } = useContext(TimerContext) as MyTimerContext

  return (
    <ConfigDescriptionWrapper>
      <div>
        <p>Pomodoro Time: </p>
        <span>&nbsp;{secondsToTime(timeState.pomodoroTime)}</span>
      </div>
      <div>
        <p>Short Rest Time: </p>
        <span> &nbsp;{secondsToMinutes(timeState.shortRestTime)}</span>
      </div>
      <div>
        <p>Long Rest Time: </p>
        <span>&nbsp;{secondsToMinutes(timeState.longRestTime)}</span>
      </div>
      <div>
        <p>Cycles:</p> <span>&nbsp;{timeState.cycles}</span>
      </div>
    </ConfigDescriptionWrapper>
  )
}

const ConfigDescriptionWrapper = styled.div`
  & > div:not(:last-of-type) {
    margin: 15px 0;
  }

  & div {
    display: flex;
    justify-content: center;
  }
`
