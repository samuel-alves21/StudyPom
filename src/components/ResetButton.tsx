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

  return <ToggleButton onClick={handleClick}>Reset</ToggleButton>
}
