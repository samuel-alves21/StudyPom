import styled from 'styled-components'
import { useEffect, useContext } from 'react'
import { Buttons } from './Buttons'
import { Timer } from './Timer'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { ButtonsContext, MyButtonContext } from '../contexts/ButtonsContext'
import { ResetButton } from './ResetButton'

import finishBellSong from '../sounds/src_sounds_bell-finish.mp3'
import startBellSong from '../sounds/src_sounds_bell-start.mp3'

const startSong = new Audio(startBellSong)
const finishSong = new Audio(finishBellSong)

export const Pomodoro = () => {
  const { timeState, timeDispatch } = useContext(TimerContext) as MyTimerContext
  const { buttonState, buttonDispatch } = useContext(
    ButtonsContext
  ) as MyButtonContext

  useEffect(() => {
    if (timeState.timeOnDisplay === 0) {
      if (buttonState.pomodoro && timeState.cyclesTemp + 1 < timeState.cycles) {
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
        timeDispatch({ type: 'SET_CYCLES_TEMP', payload: 0 })
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
        if (buttonState.short) {
          timeDispatch({
            type: 'SET_CYCLES_TEMP',
            payload: timeState.cyclesTemp + 1,
          })
        }
        buttonDispatch({ type: 'POMODORO' })
      }
    }
    if (
      buttonState.pomodoro &&
      timeState.timeOnDisplay === timeState.pomodoroTime &&
      timeState.timeCounting
    ) {
      finishSong.play()
    }
    if (
      (buttonState.short &&
        timeState.timeOnDisplay === timeState.shortRestTime &&
        timeState.timeCounting) ||
      (buttonState.long &&
        timeState.timeOnDisplay === timeState.longRestTime &&
        timeState.timeCounting)
    ) {
      startSong.play()
    }
  }, [
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
    timeState.timeCounting,
    timeState.cyclesTemp,
  ])
  return (
    <PomodoroWrapper>
      <Buttons />
      <Timer />
      <ResetButton />
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
