import styled from 'styled-components'
import { OptionsBtn } from './OptionsBtn'
import { standardValues } from '../../../../utilities/standardValues'

export type Id = keyof typeof standardValues

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
