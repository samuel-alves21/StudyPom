import styled from 'styled-components'
import { useEffect, useContext } from 'react'
import { Buttons } from './TimerButtons'
import { Display } from './Timer/Display'
import { TimerToggleButton } from './TimerToggleButton'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { ButtonsContext, MyButtonContext } from '../contexts/ButtonsContext'
import { ResetButton } from './ResetButton'

import finishBellSong from '../sounds/src_sounds_bell-finish.mp3'
import startBellSong from '../sounds/src_sounds_bell-start.mp3'

const startSong = new Audio(startBellSong)
const finishSong = new Audio(finishBellSong)

export const Counter = () => {
  const {
    timeState: {
      cycles,
      cyclesTemp,
      timeOnDisplay,
      timeCounting,
      pomodoroTime,
      shortRestTime,
      longRestTime,
    },
    timeDispatch,
  } = useContext(TimerContext) as MyTimerContext

  const { buttonState, buttonDispatch } = useContext(
    ButtonsContext
  ) as MyButtonContext

  useEffect(() => {
    if (timeOnDisplay === 0) {
      if (buttonState.pomodoro && cyclesTemp + 1 < cycles) {
        timeDispatch({
          type: 'SET_TIME_ON_DISPLAY',
          payload: shortRestTime,
        })

        buttonDispatch({ type: 'SHORT' })
      } else {
        timeDispatch({
          type: 'SET_TIME_ON_DISPLAY',
          payload: longRestTime,
        })

        buttonDispatch({ type: 'LONG' })
        timeDispatch({ type: 'SET_CYCLES_TEMP', payload: 0 })
      }
      if (buttonState.short || buttonState.long) {
        timeDispatch({
          type: 'SET_TIME_ON_DISPLAY',
          payload: pomodoroTime,
        })
        timeDispatch({
          type: 'SET_CYCLES_FINISHED',
          payload: 1,
        })
        if (buttonState.short) {
          timeDispatch({
            type: 'SET_CYCLES_TEMP',
            payload: cyclesTemp + 1,
          })
        }
        buttonDispatch({ type: 'POMODORO' })
      }
    }
    if (
      buttonState.pomodoro &&
      timeOnDisplay === pomodoroTime &&
      timeCounting
    ) {
      finishSong.play()
    }
    if (
      (buttonState.short && timeOnDisplay === shortRestTime && timeCounting) ||
      (buttonState.long && timeOnDisplay === longRestTime && timeCounting)
    ) {
      startSong.play()
    }
  }, [
    timeDispatch,
    buttonDispatch,
    timeOnDisplay,
    shortRestTime,
    buttonState.pomodoro,
    buttonState.short,
    pomodoroTime,
    longRestTime,
    cycles,
    buttonState.long,
    timeCounting,
    cyclesTemp,
  ])
  return (
    <PomodoroWrapper>
      <Buttons />
      <Display />
      <ButtonsWrapper>
        <TimerToggleButton />
        <ResetButton />
      </ButtonsWrapper>
    </PomodoroWrapper>
  )
}

const PomodoroWrapper = styled.div`
  max-width: 600px;

  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;

  margin: 20px 0;
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  transition: color 0.3s ease-in-out;
`
