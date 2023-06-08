import { useContext, useEffect } from "react"
import { MyTimerContext, TimerContext } from "../contexts/TimerContext"
import { ButtonsContext, MyButtonContext } from "../contexts/ButtonsContext"

export const useInit = () => {
  const { buttonDispatch } = useContext(ButtonsContext) as MyButtonContext

  const {
    timeState: { pomodoroTime },
    timeDispatch,
  } = useContext(TimerContext) as MyTimerContext

  useEffect(() => {
    buttonDispatch({ type: 'POMODORO' })
    timeDispatch({ type: 'SET_POMODORO_TIME', payload: pomodoroTime })
  }, [pomodoroTime, timeDispatch, buttonDispatch])
}