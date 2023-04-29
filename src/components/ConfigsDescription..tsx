import { useContext } from 'react'
import styled from 'styled-components'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { secondsToMinutes } from '../functions/secondsToMinutes'

export const ConfigDescription = () => {
  const { timeState } = useContext(TimerContext) as MyTimerContext

  return (
    <ConfigDescriptionWrapper>
      <h1>your config</h1>
      <div>
        <p>Pomodoro Time: </p>
        <span>&nbsp;{secondsToMinutes(timeState.pomodoroTime)}</span>
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
