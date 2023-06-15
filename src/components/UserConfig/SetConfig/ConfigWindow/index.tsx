import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { SetTimer } from './SetTimer'
import { ConfigNav } from './ConfigNav'
import { breakpoints } from '../../../../utilities/breakpoints'
import { SetBackground } from './SetBackgound'

interface ConfigWindowProps {
  setShouldDisplay: (shouldDisplay: boolean) => void
  shouldDisplay: boolean
  gear: HTMLElement
}

interface ThisWindownsProps {
  display: boolean
}

export const ConfigWindow = ({ gear, setShouldDisplay, shouldDisplay }: ConfigWindowProps) => {
  const thisWindow = useRef<HTMLDivElement | null>(null)

  const [option, setOption] = useState<'timer' | 'background' | 'sounds'>('timer')

  window.onclick = (event: MouseEvent) => {
    const box = thisWindow.current as HTMLDivElement
    if (box.contains(event.target as Node) || event.target === gear) return
    if (shouldDisplay === false) return
    setShouldDisplay(false)
  }

  window.onkeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') setShouldDisplay(false)
  }

  const handleMouseEnter = () => {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    document.getElementsByTagName('body')[0].style.height = '100%'
  }

  const handleMouseLeave = () => {
    document.getElementsByTagName('body')[0].style.overflow = 'auto'
    document.getElementsByTagName('body')[0].style.height = 'initial'
  }

  useEffect(() => {
    if (!shouldDisplay) {
      setTimeout(() => setOption('timer'), 500)
    }
  }, [shouldDisplay])

  return (
    <Wrapper display={shouldDisplay} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Window ref={thisWindow} display={shouldDisplay}>
        <ConfigNav
          setOption={setOption}
          option={option}
          setShouldDisplay={setShouldDisplay}
        />
        <CurrentOptionWindow>
          <SelectedConfig>
            {option.replace(option[0], option[0].toUpperCase())}
          </SelectedConfig>
          <ConfigsWindows>
            {option === 'timer' && <SetTimer />}
            {option === 'background' && <SetBackground />}
          </ConfigsWindows>
        </CurrentOptionWindow>
      </Window>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow-y: ${({ display }: ThisWindownsProps) => (display ? 'auto' : 'hidden')};
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

const Window = styled.div`
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
  min-width: 500px;
  transition: opacity
    ${({ display }: ThisWindownsProps) =>
      display
        ? '0.2s ease-in-out'
        : '0.4s cubic-bezier(0.39, 0.575, 0.565, 1)'};

  opacity: ${({ display }: ThisWindownsProps) => (display ? '1' : '0')};
  pointer-events: ${({ display }: ThisWindownsProps) =>
    display ? 'all' : 'none'};
  animation: ${({ display }: ThisWindownsProps) =>
      display
        ? 'slide-in ease-in-out'
        : 'slide-out  cubic-bezier(0.39, 0.575, 0.565, 1)'}
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
