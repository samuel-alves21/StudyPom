import { ButtonContextType, ButtonsContext } from '../contexts/ButtonsContext'
import { TimerContext, TimerContextType } from '../contexts/TimerContext'
import { useContext, useEffect, useMemo } from 'react'
import { CustomizationContext, CustomizationContextType } from '../contexts/CustomizationContext'
import { ref, set } from 'firebase/database'
import { database } from '../firebase/config'
import { UserContext, UserContextType } from '../contexts/UserContext'

export const useTimer = () => {
  const { buttonState, buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  const { userState: { id, pendentUser } } = useContext(UserContext) as UserContextType

  const {
    customizationState: {
      sound: { start, end },
      volume,
    },
  } = useContext(CustomizationContext) as CustomizationContextType

  const {
    timeState: { cycles, cyclesTemp, timeOnDisplay, timeCounting, pomodoroTime, shortRestTime, longRestTime, workedTime, cyclesFinished, stagedWorkedTime },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType

  const startSong = useMemo(() => new Audio(start), [start])
  const finishSong = useMemo(() => new Audio(end), [end])

  startSong.volume = Number(volume)
  finishSong.volume = Number(volume)

  useEffect(() => {
    if (timeOnDisplay === 0) {
      if (buttonState.pomodoro) {
        timeDispatch({ type: 'SET_CYCLES_FINISHED', payload: 1})
        timeDispatch({ type: 'SET_WORKED_TIME', payload: pomodoroTime})
        if (!pendentUser) {
          set(ref(database, `users/${id}/progress`), {
            workedTime: stagedWorkedTime,
            cyclesFinished: cyclesFinished + 1 
          })
        }
        if (cyclesTemp + 1 < cycles) {
          timeDispatch({
            type: 'SET_TIME_ON_DISPLAY',
            payload: shortRestTime
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
      }

      if (buttonState.short || buttonState.long) {
        timeDispatch({
          type: 'SET_TIME_ON_DISPLAY',
          payload: pomodoroTime,
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
    cyclesFinished,
    workedTime,
    id,
    pendentUser,
    stagedWorkedTime
  ])
}
