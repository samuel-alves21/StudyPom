import { useCallback, useContext, useEffect, useState } from 'react'
import { useInterval } from '../hooks/useInterval'
import { TimerContext, MyTimerContext } from '../contexts/TimerContext'

interface Props {
  defaultPomodoroTimer: number
  children?: React.ReactNode
  shortRestTime: number
  LongRestTime: number
  cycles: number
}

export const TimerControls  = (props: Props) => {
  const {timeState: {LongRestTime, cycles, defaultPomodoroTimer, shortRestTime}, timeDispatch} = useContext(TimerContext) as MyTimerContext

  const [mainTime, setMainTime] = useState(props.defaultPomodoroTimer)
  const [timeCounting, setTimeCounting] = useState(false)
  const [working, setWorking] = useState(false)
  const [resting, setResting] = useState(false)
  const [cyclesManager, setCyclesManager] = useState(
    new Array(props.cycles).fill(true)
  )

  const [completedCycles, setCompletedCycles] = useState(0)
  const [fullWorkingTime, setFullWorkingTime] = useState(0)
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0)

  const configWork = useCallback((): void => {
    setWorking(true)
    setTimeCounting(true)
    setResting(false)
    timeDispatch({type: 'SET_DEFAULT_POMODORO_TIMER',  payload: defaultPomodoroTimer})
  }, [defaultPomodoroTimer, defaultPomodoroTimer])

  const configRest = useCallback(
    (long: boolean): void => {
      setWorking(false)
      setTimeCounting(true)
      setResting(true)
      timeDispatch({type: 'SET_DEFAULT_POMODORO_TIMER', payload: defaultPomodoroTimer})

      if (long) {
        timeDispatch(props.LongRestTime)
      } else {
        timeDispatch(props.shortRestTime)
      }
    },
    [defaultPomodoroTimer, props.LongRestTime, props.shortRestTime]
  )

  useEffect(() => {
    if (working) {
      document.body.classList.add('working')
    } else {
      document.body.classList.remove('working')
    }

    if (mainTime > 0) return

    if (working && cyclesManager.length > 0) {
      configRest(false)
      cyclesManager.pop()
    } else if (working && cyclesManager.length <= 0) {
      configRest(true)
      setCyclesManager(new Array(props.cycles).fill(true))
      setCompletedCycles(completedCycles + 1)
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1)
    if (resting) configWork()
  }, [
    working,
    cyclesManager,
    mainTime,
    completedCycles,
    numberOfPomodoros,
    resting,
    configRest,
    configWork,
    props.cycles,
  ])

  return (

  )
}
