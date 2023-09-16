import { useContext, useEffect, useState } from 'react'
import { ButtonsContext, ButtonContextType } from '../../contexts/ButtonsContext'
import { UserContext, UserContextType } from '../../contexts/UserContext'

export const CurrentTimerOption = () => {
  const { userState: { userName } } = useContext(UserContext) as UserContextType

  const {
    buttonState: { short, pomodoro, wasClicked },
  } = useContext(ButtonsContext) as ButtonContextType

  const [currentOption, setCurrentOption] = useState('Are you Ready?')

  useEffect(() => {
    if (wasClicked) {
      setCurrentOption(pomodoro ? 'Working' : short ? 'Short Break' : 'Long Break')
    } else {
      setCurrentOption(`${userName} Let's get started`)
    }
  }, [wasClicked, pomodoro, short, userName])

  return <h1 className='current-timer-option'>{currentOption}</h1>
}
