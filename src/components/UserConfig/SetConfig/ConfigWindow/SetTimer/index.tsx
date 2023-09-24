import styled from 'styled-components'
import { TimerConfigInput } from './TimerConfigInput'
import { LimitValues } from './LimitValues'
import { DefaultToggleButton } from './DefaultToggleButton'

export const SetTimer = () => {
  return (
    <Wrapper>
      <InputContainer>
        <label htmlFor='pomodoro'>Pomodoro Time:</label>
        <TimerConfigInput id='pomodoro' />
        <LimitValues id={'pomodoro'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='short'>Short Rest Time:</label>
        <TimerConfigInput id='short' />
        <LimitValues id={'short'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='long'>Long Rest Time:</label>
        <TimerConfigInput id='long' />
        <LimitValues id={'long'} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='cycles'>Cycles:</label>
        <TimerConfigInput id='cycles' />
        <LimitValues id={'cycles'} />
      </InputContainer>
      <InputContainer>
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

  & > span {
    font-size: calc(1.6rem);
    cursor: pointer;
    font-weight: normal;
  }
`
