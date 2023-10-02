import styled from 'styled-components'
import { TimerContext, TimerContextType } from '../../../../contexts/TimerContext'
import { useContext, useState } from 'react'
import { SaveConfigContext, SaveConfigContextType } from '../../../../contexts/SaveConfigContext'
import { CustomizationContext, CustomizationContextType } from '../../../../contexts/CustomizationContext'

interface ResetConfigProps {
  animate: boolean
  isSaved: boolean
}

export const ResetConfig = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false)

  const {
    timeState: { pomodoroTime, shortRestTime, longRestTime, cycles },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType

  const {
    saveConfigDispatch,
    SaveConfigState: { isSaved },
  } = useContext(SaveConfigContext) as SaveConfigContextType

  const {
    customizationState: { sound, volume, mainColor },
  } = useContext(CustomizationContext) as CustomizationContextType

  const handleClick = () => {
    if (isSaved) return
    saveConfigDispatch({ type: 'STAGE_POMODORO_TIME', payload: pomodoroTime })
    timeDispatch({ type: 'SET_POMODORO_CONFIG_VALUE_INPUT', payload: pomodoroTime })
    saveConfigDispatch({ type: 'STAGE_SHORT_TIME', payload: shortRestTime })
    timeDispatch({ type: 'SET_SHORT_CONFIG_VALUE_INPUT', payload: shortRestTime })
    saveConfigDispatch({ type: 'STAGE_LONG_TIME', payload: longRestTime })
    timeDispatch({ type: 'SET_LONG_CONFIG_VALUE_INPUT', payload: longRestTime })
    saveConfigDispatch({ type: 'STAGE_CYCLES', payload: cycles })
    timeDispatch({ type: 'SET_CYCLES_CONFIG_VALUE_INPUT', payload: cycles })

    saveConfigDispatch({ type: 'STAGE_SOUND', payload: sound })
    saveConfigDispatch({ type: 'STAGE_VOLUME', payload: volume })
    saveConfigDispatch({ type: 'STAGE_COLOR', payload: mainColor })

    saveConfigDispatch({ type: 'SET_IS_SAVED', payload: true })
    timeDispatch({ type: 'SET_IS_INPUT_VALUE_CHANGED', payload: false })

    setShouldAnimate(true)
  }

  const handleAnimation = () => {
    if (shouldAnimate) {
      setShouldAnimate(false)
    }
  }

  return (
    <Wrapper isSaved={isSaved} animate={shouldAnimate} onAnimationEnd={handleAnimation}>
      <i className='bi bi-arrow-clockwise' onClick={handleClick}></i>
    </Wrapper>
  )
}

const Wrapper = styled.div<ResetConfigProps>`
  font-size: 30px;
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: var(--color-primary);
    }
  }

  animation: ${({ animate }) => (animate ? 'full-rotate-animation 0.7s linear' : 'none')};

  @keyframes full-rotate-animation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  ${({ isSaved }) => {
    if (isSaved) {
      return `
        cursor: not-allowed;
        opacity: 0.5;

        @media (hover: hover) and (pointer: fine) {
        &:hover {
            color: white;
          }
        }
      `
    }
  }}
`
