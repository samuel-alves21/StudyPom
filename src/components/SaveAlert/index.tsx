import { useContext } from 'react'
import styled from 'styled-components'
import { SaveConfigContext, SaveConfigContextType } from '../../contexts/SaveConfigContext'
import { ButtonContextType, ButtonsContext } from '../../contexts/ButtonsContext'
import { UserContext, UserContextType } from '../../contexts/UserContext'
import { TimerContext, TimerContextType } from '../../contexts/TimerContext'
import { setUserConfig } from '../../firebase/setUserConfig'
import { standardValues } from '../../utilities/standardValues'
import { getUserConfig } from '../../firebase/getUserConfig'

export const SaveAlert = () => {
  const {
    SaveConfigState: {
      stagedCycle,
      stagedLongRestTime,
      stagedPomodoroTime,
      stagedShortRestTime,
      saveAlert: { shouldDisplay, alertType },
    },
    saveConfigDispatch,
  } = useContext(SaveConfigContext) as SaveConfigContextType

  const {
    timeDispatch,
    timeState: { isInputValueChanged, isDefault },
  } = useContext(TimerContext) as TimerContextType

  const { userState } = useContext(UserContext) as UserContextType

  const { buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  const handleConfirmAlert = () => {
    saveConfigDispatch({ type: 'REMOVE_ALERT' })
  }

  const handleSaveConfig = async () => {
    if (!isInputValueChanged) {
      if (!isDefault) {
        saveConfigDispatch({ type: 'REMOVE_ALERT' })
        timeDispatch({ type: 'CONFIG_POMODORO_TIME', payload: standardValues.pomodoro })
        timeDispatch({ type: 'CONFIG_SHORT_TIME', payload: standardValues.short })
        timeDispatch({ type: 'CONFIG_LONG_TIME', payload: standardValues.long })
        timeDispatch({ type: 'CONFIG_CYCLES', payload: standardValues.cycles })
        timeDispatch({ type: 'RESET_ALL' })
        buttonDispatch({ type: 'CLICKED', payload: false })
        buttonDispatch({ type: 'POMODORO' })
        timeDispatch({ type: 'SET_DEFAULT', payload: !isDefault })
      } else {
        saveConfigDispatch({ type: 'REMOVE_ALERT' })
        timeDispatch({ type: 'RESET_ALL' })
        buttonDispatch({ type: 'CLICKED', payload: false })
        buttonDispatch({ type: 'POMODORO' })
        timeDispatch({ type: 'SET_DEFAULT', payload: !isDefault })
        if (!userState.pendentUser) {
          await getUserConfig(userState.id, timeDispatch)
        }
      }
    } else {
      saveConfigDispatch({ type: 'SET_IS_SAVED', payload: true })
      timeDispatch({ type: 'CONFIG_POMODORO_TIME', payload: stagedPomodoroTime })
      timeDispatch({ type: 'CONFIG_SHORT_TIME', payload: stagedShortRestTime })
      timeDispatch({ type: 'CONFIG_LONG_TIME', payload: stagedLongRestTime })
      timeDispatch({ type: 'CONFIG_CYCLES', payload: stagedCycle })
      timeDispatch({ type: 'RESET_ALL' })
      buttonDispatch({ type: 'CLICKED', payload: false })
      buttonDispatch({ type: 'POMODORO' })
      await setUserConfig(userState.id, stagedPomodoroTime, stagedShortRestTime, stagedLongRestTime, stagedCycle)
      saveConfigDispatch({ type: 'REMOVE_ALERT' })
    }
  }

  return (
    <Wrapper style={{ pointerEvents: shouldDisplay ? 'all' : 'none' }}>
      <AlertBox className={shouldDisplay ? 'scale-pop-up' : 'reverse-scale-pop-up'}>
        <h3>
          {alertType === 'notSaved'
            ? 'Please save or reset your config before exiting'
            : 'Timer is running, saving now will reset the timer'}
        </h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {alertType === 'timerRunning' && (
            <button className='save-alert' onClick={handleSaveConfig}>
              save
            </button>
          )}
          {alertType === 'timerRunning' && (
            <button className='save-alert' onClick={handleConfirmAlert}>
              cancel
            </button>
          )}
          {alertType === 'notSaved' && (
            <button className='save-alert' onClick={handleConfirmAlert}>
              ok
            </button>
          )}
        </div>
      </AlertBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100%;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;

  .scale-pop-up {
    animation: scale-pop-up 0.15s ease-in-out forwards;

    @keyframes scale-pop-up {
      0% {
        transform: scale(0, 0);
      }

      80% {
        transform: scale(1.1, 1.1);
      }

      100% {
        transform: scale(1, 1);
      }
    }
  }

  .reverse-scale-pop-up {
    animation: reverse-scale-pop-up 0.15s ease-in-out forwards;

    @keyframes reverse-scale-pop-up {
      0% {
        transform: scale(1, 1);
      }

      20% {
        transform: scale(1.1, 1.1);
      }

      100% {
        transform: scale(0, 0);
      }
    }
  }
`

const AlertBox = styled.div`
  max-width: 500px;
  background-color: var(--color-primary);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-1);
  border-radius: 10px;
  pointer-events: all;

  & button {
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        opacity: 0.8;
      }
    }
  }
`
