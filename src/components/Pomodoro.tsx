import styled from 'styled-components'
import { Buttons } from './Buttons'
import { Timer } from './Timer'
import { useEffect, useState,  useContext } from 'react'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { ButtonsContext, MyContext } from '../contexts/ButtonsContext'

export const Pomodoro = () => {
  const [cycles, setCycles] = useState(0)
  const { timeState, timeDispatch } = useContext(TimerContext) as MyTimerContext
  const { buttonState, buttonDispatch } = useContext(ButtonsContext) as MyContext

  useEffect(() => {
    if (timeState.timeOnDisplay === 0) {
      if (buttonState.pomodoro && cycles + 1 < timeState.cycles) {
        timeDispatch({
          type: 'SET_TIME_ON_DISPLAY',
          payload: timeState.shortRestTime,
        })

        buttonDispatch({ type: 'SHORT' })
      } else {
        timeDispatch({
          type: 'SET_TIME_ON_DISPLAY',
          payload: timeState.longRestTime,
        })

        buttonDispatch({ type: 'LONG' })
        setCycles(0)
      }
      if (buttonState.short || buttonState.long) {
        timeDispatch({
          type: 'SET_TIME_ON_DISPLAY',
          payload: timeState.pomodoroTime,
        })
        timeDispatch({
          type: 'SET_CYCLES_FINISHED',
          payload: 1,
        })
        if (buttonState.short) setCycles(cycles + 1)
        buttonDispatch({ type: 'POMODORO' })
      }
    }
  }, [
    setCycles,
    timeDispatch,
    buttonDispatch,
    timeState.timeOnDisplay,
    timeState.shortRestTime,
    buttonState.pomodoro,
    buttonState.short,
    timeState.pomodoroTime,
    timeState.longRestTime,
    timeState.cycles,
    buttonState.long,
    cycles
  ])
  return (
    <PomodoroWrapper>
      <Buttons />
      <Timer />
    </PomodoroWrapper>
  )
}

const PomodoroWrapper = styled.div`
  max-width: 600px;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 20px 0;
`
