import { useContext } from 'react'
import styled from 'styled-components'
import { TimerContext, TimerContextType } from '../../../../../../contexts/TimerContext'
import { useSetDefaultPomodoroValues } from '../../../../../../hooks/useSetDefaultPomodoroValues'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../../contexts/SaveConfigContext'

interface WrapperProps {
  isDefault: boolean
}

export const DefaultToggleButton = () => {

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
    timeDispatch({ type: 'SET_DEFAULT', payload: !isDefault })
  }

  return (
    <>
      <span onClick={handleClick}>pomodoro default:</span>
      <Wrapper onClick={handleClick} isDefault={isDefault}>
        <Circle className={isDefault ? 'circle-slide-in' : 'circle-slide-out'}></Circle>
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

  .circle-slide-in {
    animation: circle-slide-in 0.3s ease-in-out forwards;

    @keyframes circle-slide-in {
      0% {
        transform: translateX(0);
      }

      100% {
        transform: translateX(183%);
      }
    }
  }

  .circle-slide-out {
    animation: circle-slide-out 0.3s ease-in-out forwards;

    @keyframes circle-slide-out {
      0% {
        transform: translateX(183%);
      }

      100% {
        transform: translateX(0);
      }
    }
  }
`

const Circle = styled.div`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: #fff;
`
