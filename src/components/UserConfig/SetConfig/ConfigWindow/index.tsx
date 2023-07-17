import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { SetTimer } from './SetTimer'
import { ConfigNav } from './ConfigNav'
import { breakpoints } from '../../../../utilities/breakpoints'
import { SetBackground } from './SetBackgound'
import { SetAudio } from './SetAudio'
import { SetColor } from './SetColor'
import { useDisplay } from '../../../../hooks/useDisplay'
import { ConfigWindowProps, StyledConfingWindow } from '../../../../types/types'

export const ConfigWindow = ({ gear, setShouldDisplay, shouldDisplay }: ConfigWindowProps) => {
  const thisWindow = useRef<HTMLDivElement | null>(null)

  useDisplay(gear, setShouldDisplay, shouldDisplay, thisWindow.current)

  const [option, setOption] = useState<'timer' | 'background' | 'sounds' | 'color'>('timer')

  useEffect(() => {
    if (!shouldDisplay) {
      setTimeout(() => setOption('timer'), 500)
    }
  }, [shouldDisplay])

  return (
    <Wrapper shouldDisplay={shouldDisplay}>
      <Window ref={thisWindow} shouldDisplay={shouldDisplay}>
        <ConfigNav setOption={setOption} option={option} setShouldDisplay={setShouldDisplay} />
        <CurrentOptionWindow>
          <SelectedConfig>{option.replace(option[0], option[0].toUpperCase())}</SelectedConfig>
          <ConfigsWindows>
            {option === 'timer' && <SetTimer />}
            {option === 'background' && <SetBackground />}
            {option === 'sounds' && <SetAudio />}
            {option === 'color' && <SetColor />}
          </ConfigsWindows>
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
  overflow-y: ${({ shouldDisplay }) => (shouldDisplay ? 'auto' : 'hidden')};
  margin: 100px 10px 20px 10px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
  min-height: 400px;
  max-height: 70%;
  min-width: 500px;
  transition: opacity
    ${({ shouldDisplay }) => (shouldDisplay ? '0.2s ease-in-out' : '0.4s cubic-bezier(0.39, 0.575, 0.565, 1)')};
  opacity: ${({ shouldDisplay }) => (shouldDisplay ? '1' : '0')};
  pointer-events: ${({ shouldDisplay }) => (shouldDisplay ? 'all' : 'none')};
  animation: ${({ shouldDisplay }) =>
      shouldDisplay ? 'slide-in ease-in-out' : 'slide-out  cubic-bezier(0.39, 0.575, 0.565, 1)'}
    0.5s forwards;

  @keyframes slide-in {
    0% {
      transform: translateY(-15%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  @keyframes slide-out {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-15%);
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    min-width: 320px;
  }
`

const CurrentOptionWindow = styled.div`
  width: 100%;
  padding: 20px;
`

const SelectedConfig = styled.h1`
  font-size: 2.5rem;
`

const ConfigsWindows = styled.div`
  margin: 20px 0;
`
