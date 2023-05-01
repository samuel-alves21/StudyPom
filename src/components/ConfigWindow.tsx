import { useRef } from 'react'
import styled from 'styled-components'
import { ConfigsOptions } from './ConfigsOptions'

interface ConfigWindowProps {
  setShouldDisplay: (shouldDisplay: boolean) => void
  shouldDisplay: boolean
  gear: HTMLElement
}

interface WrapperProps {
  display: boolean
}

export const ConfigWindow = (props: ConfigWindowProps) => {
  const settingsBox = useRef<HTMLDivElement | null>(null)

  window.onclick = (event: MouseEvent) => {
    const box = settingsBox.current as HTMLDivElement
    if (box.contains(event.target as Node) || event.target === props.gear)
      return
    if (props.shouldDisplay === false) return
    props.setShouldDisplay(false)
  }

  window.onkeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') props.setShouldDisplay(false)
  }

  return (
    <Window ref={settingsBox} display={props.shouldDisplay}>
      <h1>Settings</h1>
      <ConfigsOptions />
    </Window>
  )
}

const Window = styled.div`
  padding: 20px 0;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 500px;
  min-width: 330px;
  transition: opacity 0.2s ease-in-out;
  top: 60px;
  opacity: ${(props: WrapperProps) => (props.display ? '1' : '0')};
  pointer-events: ${(props: WrapperProps) => (props.display ? 'all' : 'none')};
  position: absolute;
  left: calc(50% - 165px);
  z-index: 5;
  margin-inline: auto;
  animation: ${(props: WrapperProps) =>
      props.display ? 'slide-in' : 'slide-out'}
    0.5s forwards ease-in-out;

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
