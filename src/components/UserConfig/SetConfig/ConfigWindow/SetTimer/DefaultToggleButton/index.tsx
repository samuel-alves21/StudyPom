import { useContext, useState } from 'react'
import styled from 'styled-components'
import { TimerContext, TimerContextType } from '../../../../../../contexts/TimerContext'
import { useSetDefaultPomodoroValues } from '../../../../../../hooks/useSetDefaultPomodoroValues'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../../contexts/SaveConfigContext'

interface CircleProps {
  shouldAnimate: boolean
  isDefault: boolean
}

interface WrapperProps {
  isDefault: boolean
}

export const DefaultToggleButton = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false)

  const {
    timeState: { isDefault, timeCounting },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType

  const { saveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType

  useSetDefaultPomodoroValues()

  const handleClick = () => {
    timeDispatch({ type: 'SET_IS_INPUT_VALUE_CHANGED', payload: false })
    if (timeCounting) {
      saveConfigDispatch({ type: 'SET_TIMER_RUNNING_ALERT' })
      return
    }
    setShouldAnimate(true)
    timeDispatch({ type: 'SET_DEFAULT', payload: !isDefault })
  }

  return (
    <>
      <span onClick={handleClick}>pomodoro default:</span>
      <Wrapper onClick={handleClick} isDefault={isDefault}>
        <Circle shouldAnimate={shouldAnimate} isDefault={isDefault}></Circle>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div<WrapperProps>`
  width: 65px;
  height: 25px;
  border-radius: 20px;
  border: 1px solid #fff;
  cursor: pointer;
  padding: 0 2px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out;

  background-color: ${({ isDefault }) => (isDefault ? 'var(--color-primary)' : 'transparent')};
`

const Circle = styled.div<CircleProps>`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: #fff;

  ${({ shouldAnimate, isDefault }) => {
    if (shouldAnimate) {
      if (isDefault) {
        return `
        animation: circle-slide-in 0.3s ease-in-out forwards;
      `
      } else {
        return `
        animation: circle-slide-out 0.3s ease-in-out forwards;
      `
      }
    }
  }}

  @keyframes circle-slide-in {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(183%);
    }
  }

  @keyframes circle-slide-out {
    0% {
      transform: translateX(183%);
    }

    100% {
      transform: translateX(0);
    }
  }
`
