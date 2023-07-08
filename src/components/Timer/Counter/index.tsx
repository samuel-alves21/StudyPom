import styled from 'styled-components'
import { Display } from './Display'
import { CounterOptionsBtn } from './CounterOptionsBtn'
import { CounterStartBtn } from './CounterStartBtn'
import { CounterResetBtn } from './CounterResetBtn'
import { useTimer } from '../../../hooks/useTimer'

export const Counter = () => {
  useTimer()

  return (
    <CounterWrapper className='counter-wrapper'>
      <CounterOptionsBtn />
      <Display />
      <ButtonsWrapper className='buttons-wrapper'>
        <CounterStartBtn />
        <CounterResetBtn />
      </ButtonsWrapper>
    </CounterWrapper>
  )
}

const CounterWrapper = styled.div`
  max-width: 600px;

  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;

  margin: 20px 0;
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  transition: color 0.3s ease-in-out;
`
