import { ButtonContextType, ButtonsContext } from "../contexts/ButtonsContext"
import { TimerContext, TimerContextType } from "../contexts/TimerContext"
import { useContext, useEffect } from 'react'
import finishBellSong from '../sounds/pin-start.mp3'
import startBellSong from '../sounds/pin-stop.mp3'

const startSong = new Audio(startBellSong)
const finishSong = new Audio(finishBellSong)

export const useTimer = () => {
  console.log(startSong)
  const { buttonState, buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

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
  } = useContext(TimerContext) as TimerContextType

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
}