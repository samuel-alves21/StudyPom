import styled from 'styled-components'
import { TimerConfigInput } from './TimerConfigInput'
import { useState, useContext } from 'react'
import { LimitValues } from './LimitValues'
import { TimerContext, TimerContextType } from '../../../../../contexts/TimerContext'
import { DefaultToggleButton } from '../../../../DefaultToggleButton'

export const SetTimer = () => {
  const {
    timeState: { pomodoroTime, shortRestTime, longRestTime, cycles, isDefault }, 
    timeDispatch 
  } = useContext(TimerContext) as TimerContextType

  const [pomodoroConfigTime, setPomodoroConfigTime] = useState<string>(String(pomodoroTime))
  const [shortConfigTime, setShortConfigTime] = useState<string>(String(shortRestTime))
  const [longConfigTime, setLongConfigTime] = useState<string>(String(longRestTime))
  const [configCycles, setConfigCycles] = useState<string>(String(cycles))

  return (
    <Wrapper>
      <InputContainer>
        <label htmlFor='pomodoro'>Pomodoro Time:</label>
        <TimerConfigInput id='pomodoro' state={pomodoroConfigTime} setState={setPomodoroConfigTime} />
        <LimitValues id={'pomodoro'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='short'>Short Rest Time:</label>
        <TimerConfigInput id='short' state={shortConfigTime} setState={setShortConfigTime} />
        <LimitValues id={'short'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='long'>Long Rest Time:</label>
        <TimerConfigInput id='long' state={longConfigTime} setState={setLongConfigTime} />
        <LimitValues id={'long'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='cycles'>Cycles:</label>
        <TimerConfigInput id='cycles' state={configCycles} setState={setConfigCycles} />
        <LimitValues id={'cycles'} />
      </InputContainer>
      <InputContainer>
        <label onClick={() => timeDispatch({ type: 'SET_DEFAULT', payload: !isDefault })}>pomodoro default:</label>
        <DefaultToggleButton />
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
`
