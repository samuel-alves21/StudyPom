import styled from 'styled-components'
import { Button } from './Button'

export const Buttons = () => {
  return (
    <ButtonsWrapper>
      <Button text='Pomodoro' />
      <Button text='Short' />
      <Button text='Long' />
    </ButtonsWrapper>
  )
}

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`
