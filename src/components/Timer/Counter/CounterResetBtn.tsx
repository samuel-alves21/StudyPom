import styled from 'styled-components'
import { useContext, useState } from 'react'
import { TimerContext, TimerContextType } from '../../../contexts/TimerContext'
import { ButtonsContext, ButtonContextType } from '../../../contexts/ButtonsContext'
import { useSetWindowTitle } from '../../../hooks/useSetWindowTitle'

export interface CounterResetBtnProps {
  animate: boolean
}

export const CounterResetBtn = () => {
  const [animate, setAnimate] = useState(false)

  const { timeDispatch } = useContext(TimerContext) as TimerContextType
  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  const handleClick = () => {
    timeDispatch({ type: 'RESET_ALL' })
    buttonDispatch({ type: 'POMODORO' })
    buttonDispatch({ type: 'CLICKED', payload: false })
    setAnimate(true)
  }

  useSetWindowTitle(true)

  return (
    <Wrapper
      className='counter-reset-btn'
      animate={animate}
      onAnimationEnd={() => setAnimate(false)}
    >
      <i className='bi bi-arrow-clockwise' onClick={handleClick}></i>
    </Wrapper>
  )
}

const Wrapper = styled.div<CounterResetBtnProps>`
  & .bi-arrow-clockwise {
    font-size: 3.5rem;
  }

  @media (hover: hover) and (pointer: fine) {
    & .bi-arrow-clockwise:hover {
      color: var(--color-primary);
      cursor: pointer;
    }
  }

  animation: ${({ animate }) => (animate ? 'full-rotate 0.7s linear forwards' : 'none')};

  @keyframes full-rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`
