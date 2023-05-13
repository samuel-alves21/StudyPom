import styled from 'styled-components'
import { useRef } from 'react'
import { ConfigsOptions } from './ConfigsOptions'

interface ConfigWindowProps {
  setShouldDisplay: (shouldDisplay: boolean) => void
  shouldDisplay: boolean
  gear: HTMLElement
}

interface WrapperProps {
  display: boolean
}

export const ConfigWindow = ({
  gear,
  setShouldDisplay,
  shouldDisplay,
}: ConfigWindowProps) => {
  const settingsBox = useRef<HTMLDivElement | null>(null)

  window.onclick = (event: MouseEvent) => {
    const box = settingsBox.current as HTMLDivElement
    if (box.contains(event.target as Node) || event.target === gear) return
    if (shouldDisplay === false) return
    setShouldDisplay(false)
  }

  window.onkeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') setShouldDisplay(false)
  }

  return (
    <Window ref={settingsBox} display={shouldDisplay}>
      <h1>Settings</h1>
      <ConfigsOptions />
    </Window>
  )
}

const Window = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 400px;
  min-width: 320px;
  max-width: 400px;
  transition: opacity
    ${({ display }: WrapperProps) =>
      display
        ? '0.2s ease-in-out'
        : '0.4s cubic-bezier(0.39, 0.575, 0.565, 1)'};
  top: 60px;
  opacity: ${({ display }: WrapperProps) => (display ? '1' : '0')};
  pointer-events: ${({ display }: WrapperProps) => (display ? 'all' : 'none')};
  position: absolute;
  left: calc(50% - 165px);
  z-index: 5;
  margin-inline: auto;
  animation: ${({ display }: WrapperProps) =>
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
`
