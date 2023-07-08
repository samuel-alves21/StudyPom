import { useContext, useEffect, useState } from 'react'
import { ButtonsContext, ButtonContextType } from '../../contexts/ButtonsContext'

export const CurrentTimerOption = () => {
  const {
    buttonState: { short, pomodoro, wasClicked },
  } = useContext(ButtonsContext) as ButtonContextType

  const [currentOption, setCurrentOption] = useState('Are you Ready?')

  useEffect(() => {
    if (wasClicked) {
      setCurrentOption(pomodoro ? 'Working' : short ? 'Short Break' : 'Long Break')
    } else {
      setCurrentOption('Are you Ready?')
    }
  }, [wasClicked, pomodoro, short])

  return <h1 className='current-timer-option'>{currentOption}</h1>
}
