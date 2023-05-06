import styled from 'styled-components'
import { useContext, useEffect } from 'react'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { minutesToSeconds } from '../functions/minutesToSeconds'
import { decrementTime } from '../functions/decrementTime'
import { acrementTime } from '../functions/acrementTime'
import { ConfigArrows } from './ConfigArrows'
import { TimerActionType } from '../contexts/TimerContext/reducer'
import { Id } from '../types/types'
import { secondsToMinutes } from '../functions/secondsToMinutes'
import { secondsToTime } from '../functions/secondsToTime'

interface Props {
  id: Id
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

export const ConfigInput = (props: Props) => {
  const { timeDispatch } = useContext(TimerContext) as MyTimerContext

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const regexNumbers = /[0-9]/
    const thisElement = e.target as HTMLInputElement

    if (
      props.state.length === 0 ||
      (props.state === '0' && props.id !== 'cycles')
    ) {
      if (props.id === 'cycles') {
        props.setState('0')
        return
      }
      props.setState('00')
    }

    if (e.key === 'Backspace') {
      props.setState(props.state.slice(0, -1))
      return
    }

    if (e.key === 'ArrowUp') {
      props.setState(acrementTime(Number(props.state), props.id).toString())
      return
    }

    if (e.key === 'ArrowDown') {
      props.setState(decrementTime(Number(props.state), props.id).toString())
      return
    }

    if (regexNumbers.test(e.key) && props.state.length === 2) {
      props.setState(e.key)
      return
    }

    if (regexNumbers.test(e.key)) {
      if (props.id === 'cycles' && props.state.length <= 1) {
        props.setState(e.key)
        return
      }
      props.setState(props.state + e.key)
      return
    }

    if (e.key === 'Enter') {
      thisElement.blur()
      return
    }
  }

  const handleBlur = () => {
    if (props.state.length === 0) {
      if (props.id === 'cycles') {
        props.setState('0')
        return
      }
      props.setState('00')
    }

    if (props.state.length === 1) {
      if (props.id === 'cycles') return
      props.setState('0' + props.state)
    }
  }

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
            onKeyDown={(e) => handleChange(e)}
            id={props.id}
            onBlur={handleBlur}
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
