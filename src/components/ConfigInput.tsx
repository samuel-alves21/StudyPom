import styled from 'styled-components'
import { useContext, useEffect } from 'react'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { minutesToSeconds } from '../functions/minutesToSeconds'
import { ConfigArrows } from './ConfigArrows'
import { TimerActionType } from '../contexts/TimerContext/reducer'
import { secondsToMinutes } from '../functions/secondsToMinutes'
import { secondsToTime } from '../functions/secondsToTime'
import { Id } from '../types/types'


interface Props {
  id: Id
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

export const ConfigInput = (props: Props) => {
  const { timeDispatch } = useContext(TimerContext) as MyTimerContext

  useEffect(() => {
    if (props.id === 'cycles') {
      timeDispatch({
        type: 'CONFIG_CYCLES',
        payload: Number(props.state),
      })
    } else {
      timeDispatch({
        type: `CONFIG_${props.id.toUpperCase()}_TIME` as TimerActionType,
        payload: minutesToSeconds(Number(props.state)),
      })
    }

    timeDispatch({ type: 'RESET_ALL' })
  }, [props.state, timeDispatch, props.id])

  return (
    <InputAndArrows>
          <Input
            type='text'
            value={
              props.id === 'pomodoro'
                ? secondsToTime(minutesToSeconds(Number(props.state)))
                : props.id !== 'cycles'
                ? secondsToMinutes(minutesToSeconds(Number(props.state)))
                : props.state
            }
            id={props.id}
            readOnly={true}
          />
      <ConfigArrows
        pomodoroConfigTime={props.state}
        setPomodoroConfigTime={props.setState}
        id={props.id}
      />
    </InputAndArrows>
  )
}

const InputAndArrows = styled.div`
  display: flex;
`

const Input = styled.input`
  width: 70px;
  border-radius: 5px 0 0 5px;
  height: 35px;
  pointer-events: none;
`
