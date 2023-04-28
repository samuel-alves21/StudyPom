import styled from 'styled-components'
import { ToggleButton } from './TimerToggleButton'
import { useContext } from 'react'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { ButtonsContext, MyButtonContext } from '../contexts/ButtonsContext'

export const ResetButton = () => {
  const { timeDispatch } = useContext(TimerContext) as MyTimerContext
  const { buttonDispatch } = useContext(ButtonsContext) as MyButtonContext

  const handleClick = () => {
    timeDispatch({ type: 'RESET_ALL' })
    buttonDispatch({ type: 'POMODORO' })
  }

  return <Btn onClick={handleClick}>Reset</Btn>
}

const Btn = styled(ToggleButton)`
  margin-top: 20px;
`
