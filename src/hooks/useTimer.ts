import { ButtonContextType, ButtonsContext } from '../contexts/ButtonsContext'
import { TimerContext, TimerContextType } from '../contexts/TimerContext'
import { useContext, useEffect, useMemo } from 'react'
import { CustomizationContext, CustomizationContextType } from '../contexts/CustomizationContext'

export const useTimer = () => {
  const { buttonState, buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  const {
    customizationState: {
      sound: { start, end },
      volume,
    },
  } = useContext(CustomizationContext) as CustomizationContextType

  const {
    timeState: { cycles, cyclesTemp, timeOnDisplay, timeCounting, pomodoroTime, shortRestTime, longRestTime },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType

  const startSong = useMemo(() => new Audio(start), [start])
  const finishSong = useMemo(() => new Audio(end), [end])

  startSong.volume = Number(volume)
  finishSong.volume = Number(volume)

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
    if (buttonState.pomodoro && timeOnDisplay === pomodoroTime && timeCounting) {
      startSong.play()
    }
    if (
      (buttonState.short && timeOnDisplay === shortRestTime && timeCounting) ||
      (buttonState.long && timeOnDisplay === longRestTime && timeCounting)
    ) {
      finishSong.play()
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
    startSong,
    finishSong,
  ])
}
