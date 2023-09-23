import styled from 'styled-components'
import { TimerConfigInput } from './TimerConfigInput'
import { useState, useContext, useEffect } from 'react'
import { LimitValues } from './LimitValues'
import { TimerContext, TimerContextType } from '../../../../../contexts/TimerContext'
import { DefaultToggleButton } from './DefaultToggleButton'
import { UserContext, UserContextType } from '../../../../../contexts/UserContext'

export const SetTimer = () => {
  const {
    timeState: { pomodoroTime, shortRestTime, longRestTime, cycles },
  } = useContext(TimerContext) as TimerContextType

  const { userState } = useContext(UserContext) as UserContextType

  const [pomodoroConfigTime, setPomodoroConfigTime] = useState<string>(String(pomodoroTime))
  const [shortConfigTime, setShortConfigTime] = useState<string>(String(shortRestTime))
  const [longConfigTime, setLongConfigTime] = useState<string>(String(longRestTime))
  const [configCycles, setConfigCycles] = useState<string>(String(cycles))

  const [isChanged, setIsChanged] = useState(false)

  const isChangedProps = {
    isChanged: isChanged,
    setIsChanged: setIsChanged,
  }

  useEffect(() => {
    if (!userState.pendentUser) {
      setPomodoroConfigTime(pomodoroTime.toString())
      setShortConfigTime(shortRestTime.toString())
      setLongConfigTime(longRestTime.toString())
      setConfigCycles(cycles.toString())
    }
  }, [pomodoroTime, shortRestTime, longRestTime, cycles, userState.pendentUser])

  return (
    <Wrapper>
      <InputContainer>
        <label htmlFor='pomodoro'>Pomodoro Time:</label>
        <TimerConfigInput
          id='pomodoro'
          state={pomodoroConfigTime}
          setState={setPomodoroConfigTime}
          {...isChangedProps}
        />
        <LimitValues id={'pomodoro'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='short'>Short Rest Time:</label>
        <TimerConfigInput id='short' state={shortConfigTime} setState={setShortConfigTime} {...isChangedProps} />
        <LimitValues id={'short'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='long'>Long Rest Time:</label>
        <TimerConfigInput id='long' state={longConfigTime} setState={setLongConfigTime} {...isChangedProps} />
        <LimitValues id={'long'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='cycles'>Cycles:</label>
        <TimerConfigInput id='cycles' state={configCycles} setState={setConfigCycles} {...isChangedProps} />
        <LimitValues id={'cycles'} />
      </InputContainer>
      <InputContainer>
        <DefaultToggleButton setIsChanged={setIsChanged} />
      </InputContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-1);
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > span {
    font-size: calc(1.6rem);
    cursor: pointer;
    font-weight: normal;
  }
`
