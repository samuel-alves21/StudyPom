import styled from 'styled-components'
import { useContext } from 'react'
import { TimerContext, TimerContextType } from '../../contexts/TimerContext'
import { secondsToMinutes } from '../../functions/secondsToMinutes'
import { secondsToTime } from '../../functions/secondsToTime'

export const SetConfig = () => {
  const { timeState } = useContext(TimerContext) as TimerContextType

  return (
    <ConfigDescriptionWrapper className='config-description'>
      <div>
        <p className='pomodoro-time'>Pomodoro Time: </p>
        <span>&nbsp;{secondsToTime(timeState.pomodoroTime)}</span>
      </div>
      <div>
        <p className='short-rest-time'>Short Rest Time: </p>
        <span> &nbsp;{secondsToMinutes(timeState.shortRestTime)}</span>
      </div>
      <div>
        <p className='long-rest-time'>Long Rest Time: </p>
        <span>&nbsp;{secondsToMinutes(timeState.longRestTime)}</span>
      </div>
      <div>
        <p className='cycles'>Cycles:</p> <span>&nbsp;{timeState.cycles}</span>
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
