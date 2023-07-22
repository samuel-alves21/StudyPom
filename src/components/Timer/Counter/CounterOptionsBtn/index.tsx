import styled from 'styled-components'
import { OptionsBtn } from './OptionsBtn'

export type Id = 'pomodoro' | 'short' | 'long' | 'cycles'

export const CounterOptionsBtn = () => {
  return (
    <ButtonsWrapper className='buttons-wrapper'>
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
