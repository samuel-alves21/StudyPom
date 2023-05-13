import styled from 'styled-components'
import { ConfigInput } from './ConfigInput'
import { useState } from 'react'
import { ConfigLimitValues } from './configLimitValues'

export const ConfigsOptions = () => {
  const [pomodoroConfigTime, setPomodoroConfigTime] = useState('25')
  const [shortConfigTime, setShortConfigTime] = useState('5')
  const [longConfigTime, setLongConfigTime] = useState('10')
  const [configCycles, setConfigCycles] = useState('4')

  return (
    <Wrapper>
      <InputContainer>
        <label htmlFor='pomodoro'>Pomodoro Time:</label>
        <ConfigInput
          id='pomodoro'
          state={pomodoroConfigTime}
          setState={setPomodoroConfigTime}
        />
        <ConfigLimitValues id={'pomodoro'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='short'>Short Rest Time:</label>
        <ConfigInput
          id='short'
          state={shortConfigTime}
          setState={setShortConfigTime}
        />
        <ConfigLimitValues id={'short'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='long'>Long Rest Time:</label>
        <ConfigInput
          id='long'
          state={longConfigTime}
          setState={setLongConfigTime}
        />
        <ConfigLimitValues id={'long'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='cycles'>Cycles:</label>
        <ConfigInput
          id='cycles'
          state={configCycles}
          setState={setConfigCycles}
        />
        <ConfigLimitValues id={'cycles'} />
      </InputContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
  width: 100%;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
