import styled from 'styled-components'
import { OptionsBtn } from './OptionsBtn'

export const CounterOptionsBtn = () => {
  return (
    <ButtonsWrapper>
      <OptionsBtn text='pomodoro' />
      <OptionsBtn text='short' />
      <OptionsBtn text='long' />
    </ButtonsWrapper>
  )
}

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`
