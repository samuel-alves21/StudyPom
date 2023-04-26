import styled from 'styled-components'
import { Buttons } from './Buttons'
import { Timer } from './Timer'

export const Pomodoro = () => {
  return (
    <PomodoroWrapper>
      <Buttons />
      <Timer />
    </PomodoroWrapper>
  )
}

const PomodoroWrapper = styled.div`
  max-width: 600px;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 20px 0;
`
