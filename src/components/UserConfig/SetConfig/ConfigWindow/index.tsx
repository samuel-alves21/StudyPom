import styled from 'styled-components'
import { useContext, useEffect, useRef, useState } from 'react'
import { SetTimer } from './SetTimer'
import { ConfigNav } from './ConfigNav'
import { breakpoints } from '../../../../utilities/breakpoints'
import { SetBackground } from './SetBackgound'
import { SetAudio } from './SetAudio'
import { SetColor } from './SetColor'
import { useConfigWindowDisplay } from '../../../../hooks/useConfigWindowDisplay'
import { SaveConfigBtn } from './SaveConfigBtn'
import { UserContext, UserContextType } from '../../../../contexts/UserContext'

interface ConfigWindowProps {
  setShouldDisplay: (shouldDisplay: boolean) => void
  shouldDisplay: boolean
  gear: HTMLElement
}

interface StyledConfingWindow {
  shouldDisplay: boolean
}

export const ConfigWindow = ({ gear, setShouldDisplay, shouldDisplay }: ConfigWindowProps) => {
  const [option, setOption] = useState<'timer' | 'background' | 'sounds' | 'color'>('timer')

  const { userState } = useContext(UserContext) as UserContextType

  const thisWindow = useRef<HTMLDivElement | null>(null)

  useConfigWindowDisplay(gear, setShouldDisplay, shouldDisplay, thisWindow.current)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (!shouldDisplay) {
      timeout = setTimeout(() => setOption('timer'), 500)
    }

    return () => clearTimeout(timeout)
  }, [shouldDisplay])

  return (
    <Wrapper shouldDisplay={shouldDisplay}>
      <Window ref={thisWindow} shouldDisplay={shouldDisplay} className='flex-all-center flex-column'>
        <ConfigNav setOption={setOption} option={option} setShouldDisplay={setShouldDisplay} />
        <CurrentOptionWindow className='flex-all-center'>
          <SelectedConfig>{option.replace(option[0], option[0].toUpperCase())}</SelectedConfig>
          <ConfigsWindows>
            {option === 'timer' && <SetTimer />}
            {option === 'background' && <SetBackground />}
            {option === 'sounds' && <SetAudio />}
            {option === 'color' && <SetColor />}
          </ConfigsWindows>
          {userState.pendentUser || <SaveConfigBtn />}
        </CurrentOptionWindow>
      </Window>
    </Wrapper>
  )
}

const Wrapper = styled.div<StyledConfingWindow>`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 5;
  pointer-events: none;
`

const Window = styled.div<StyledConfingWindow>`
  justify-content: stretch;
  overflow-y: auto;
  margin: 100px 10px 20px 10px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
  min-height: max(50vh, 400px);
  max-height: 80%;
  min-width: 50vw;
  max-width: 80%;

  ${({ shouldDisplay }) => {
    return `
    transition: opacity ${shouldDisplay ? '0.2s ease-in-out' : '0.4s cubic-bezier(0.39, 0.575, 0.565, 1)'};
    opacity: ${shouldDisplay ? '1' : '0'};
    pointer-events: ${shouldDisplay ? 'all' : 'none'};
    animation: ${
      shouldDisplay ? 'slide-in ease-in-out' : 'slide-out cubic-bezier(0.39, 0.575, 0.565, 1)'
    } 0.5s forwards;
    `
  }}

  @keyframes slide-in {
    0% {
      transform: translateY(-20%);
    }
    100% {
      transform: translateY(-10%);
    }
  }

  @keyframes slide-out {
    0% {
      transform: translateY(-10%);
    }
    100% {
      transform: translateY(-20%);
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    min-width: 300px;
  }
`

const CurrentOptionWindow = styled.div`
  flex-direction: column;
  padding: 20px;
  margin: auto 0;
`

const SelectedConfig = styled.h1`
  font-size: 2.5rem;
  flex-grow: 1;
  margin-bottom: 20px;
`

const ConfigsWindows = styled.div`
  margin: 20px 0;
`
