import styled from 'styled-components'
import { Button } from './Button'

export const Buttons = () => {
  return (
    <ButtonsWrapper>
      <Button text='pomodoro' />
      <Button text='short' />
      <Button text='long' />
    </ButtonsWrapper>
  )
}

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`
