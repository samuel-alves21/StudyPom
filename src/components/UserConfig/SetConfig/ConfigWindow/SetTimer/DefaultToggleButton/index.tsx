import { useContext, useState } from 'react'
import styled from 'styled-components'
import { TimerContext, TimerContextType } from '../../../../../../contexts/TimerContext'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../../contexts/SaveConfigContext'
import { standardValues } from '../../../../../../utilities/standardValues'
import { ButtonContextType, ButtonsContext } from '../../../../../../contexts/ButtonsContext'
import { getUserConfig } from '../../../../../../firebase/getUserConfig'
import { UserContext, UserContextType } from '../../../../../../contexts/UserContext'

interface WrapperProps {
  isDefault: boolean
}

export const DefaultToggleButton = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false)

  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  const { userState } = useContext(UserContext) as UserContextType

  const {
    timeState: { isDefault, timeCounting },
    timeDispatch,
  } = useContext(TimerContext) as TimerContextType

  const { saveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType

  const handleClick = async () => {
    timeDispatch({ type: 'SET_IS_INPUT_VALUE_CHANGED', payload: false })
    if (timeCounting) {
      saveConfigDispatch({ type: 'SET_TIMER_RUNNING_ALERT' })
      return
    }
    if (!isDefault) {
      setShouldAnimate(true)
      timeDispatch({ type: 'CONFIG_POMODORO_TIME', payload: standardValues.pomodoro })
      timeDispatch({ type: 'CONFIG_SHORT_TIME', payload: standardValues.short })
      timeDispatch({ type: 'CONFIG_LONG_TIME', payload: standardValues.long })
      timeDispatch({ type: 'CONFIG_CYCLES', payload: standardValues.cycles })
      timeDispatch({ type: 'RESET_ALL' })
      buttonDispatch({ type: 'CLICKED', payload: false })
      buttonDispatch({ type: 'POMODORO' })
      timeDispatch({ type: 'SET_DEFAULT', payload: !isDefault })
    } else {
      setShouldAnimate(true)
      if (!userState.pendentUser) {
        timeDispatch({ type: 'SET_DEFAULT', payload: !isDefault })
        timeDispatch({ type: 'RESET_ALL' })
        buttonDispatch({ type: 'CLICKED', payload: false })
        buttonDispatch({ type: 'POMODORO' })
        await getUserConfig(userState.id, timeDispatch)
      } else {
        timeDispatch({ type: 'SET_DEFAULT', payload: !isDefault })
      }
    }
  }

  return (
    <>
      <span onClick={handleClick}>pomodoro default:</span>
      <Wrapper onClick={handleClick} isDefault={isDefault}>
        <Circle className={!shouldAnimate ? '' : isDefault ? 'circle-slide-in' : 'circle-slide-out'}></Circle>
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
