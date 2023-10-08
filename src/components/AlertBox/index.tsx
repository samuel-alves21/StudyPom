import { useContext } from 'react'
import styled from 'styled-components'
import { SaveConfigContext, SaveConfigContextType } from '../../contexts/SaveConfigContext'
import { NotSavedAlert } from './NotSavedAlert'
import { TimerRunningAlert } from './TimerRunningAlert'
import { breakpoints } from '../../utilities/breakpoints'

export const AlertBox = () => {
  const {
    SaveConfigState: {
      saveAlert: { shouldDisplay, alertType },
    },
  } = useContext(SaveConfigContext) as SaveConfigContextType

  return (
    <Wrapper style={{ pointerEvents: shouldDisplay ? 'all' : 'none' }}>
      <Box className={shouldDisplay ? 'scale-pop-up' : 'reverse-scale-pop-up'}>
        {alertType === 'notSaved' && <NotSavedAlert />}
        {alertType === 'timerRunning' && <TimerRunningAlert />}
      </Box>
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

const Box = styled.div`
  max-width: 500px;
  background-color: var(--color-primary);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-1);
  border-radius: 10px;

  min-width: 400px;
  min-height: 120px;
  
  @media (max-width: ${breakpoints.mobile}) {
    min-width: 280px;
  }

  & button {
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        opacity: 0.8;
      }
    }
  }
`
