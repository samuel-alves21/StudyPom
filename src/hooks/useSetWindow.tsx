import { useContext, useEffect } from 'react'
import { ButtonsContext, MyButtonContext } from '../contexts/ButtonsContext'
import { MyTimerContext, TimerContext } from '../contexts/TimerContext'
import { secondsToMinutes } from '../functions/secondsToMinutes'

export const useSetWindow = (wasReseted?: boolean) => {
  const {
    buttonState: { long, short, pomodoro, wasClicked },
  } = useContext(ButtonsContext) as MyButtonContext

  const {
    timeState: { timeCounting, timeOnDisplay },
  } = useContext(TimerContext) as MyTimerContext

  useEffect(() => {
    if (wasReseted) {
      document.title = 'StudyPom'
    }
    if (wasClicked) {
      if (timeCounting) {
        if (pomodoro) {
          document.title = `Working: ${secondsToMinutes(timeOnDisplay)}`
        }
        if (short) {
          document.title = `Short break: ${secondsToMinutes(timeOnDisplay)}`
        }
        if (long) {
          document.title = `Long break: ${secondsToMinutes(timeOnDisplay)}`
        }
      } else {
        document.title = 'Paused'
      }
    }
  }, [
    wasClicked,
    pomodoro,
    short,
    long,
    timeCounting,
    timeOnDisplay,
    wasReseted,
  ])
}
