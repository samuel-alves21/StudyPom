import styled from 'styled-components'
import { Input } from './Input'
import { useState } from 'react'
import { LimitValues } from './LimitValues'
import { standardValues } from '../../../../../utilities/standardValues'

export const SetTimer = () => {
  const [pomodoroConfigTime, setPomodoroConfigTime] = useState(
    String(standardValues.pomodoro)
  )
  const [shortConfigTime, setShortConfigTime] = useState(
    String(standardValues.shortBreak)
  )
  const [longConfigTime, setLongConfigTime] = useState(
    String(standardValues.longBreak)
  )
  const [configCycles, setConfigCycles] = useState(
    String(standardValues.cycles)
  )

  return (
    <Wrapper>
      <InputContainer>
        <label htmlFor='pomodoro'>Pomodoro Time:</label>
        <Input
          id='pomodoro'
          state={pomodoroConfigTime}
          setState={setPomodoroConfigTime}
        />
        <LimitValues id={'pomodoro'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='short'>Short Rest Time:</label>
        <Input
          id='short'
          state={shortConfigTime}
          setState={setShortConfigTime}
        />
        <LimitValues id={'short'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='long'>Long Rest Time:</label>
        <Input id='long' state={longConfigTime} setState={setLongConfigTime} />
        <LimitValues id={'long'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='cycles'>Cycles:</label>
        <Input id='cycles' state={configCycles} setState={setConfigCycles} />
        <LimitValues id={'cycles'} />
      </InputContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
