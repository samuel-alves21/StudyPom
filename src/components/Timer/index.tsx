import { useContext } from "react"
import { ButtonsContext, MyButtonContext } from "../../contexts/ButtonsContext"
import { Details } from "../Details"
import { Counter } from "../Counter"
import { PomodoroHeading } from "../PomodoroHeading"

export const Timer = () => {
  const {
    buttonState: { short, pomodoro, wasClicked },
  } = useContext(ButtonsContext) as MyButtonContext

  return (
    <div>
      <PomodoroHeading
        text={
          !wasClicked
            ? 'Are you Ready?'
            : pomodoro
            ? 'Working'
            : short
            ? 'Short Break'
            : 'Long Break'
        }
      />
      <Counter />
      <Details />
    </div>  
  )
}