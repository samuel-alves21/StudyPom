import styled from 'styled-components'
import { useState, useRef, useEffect } from 'react'
import { ConfigWindow } from '../ConfigWindow'

interface FilterProps {
  shouldDisplay: boolean
}

interface IconProps {
  shouldRotate: boolean
  animate: boolean
}

export const ConfigHeading = () => {
  const gear = useRef<HTMLElement | null>(null)

  const [shouldDisplay, setShouldDisplay] = useState(false)
  const [animate, setAnimate] = useState(false)

  const handleClick = () => {
    setShouldDisplay(!shouldDisplay)
    setAnimate(true)
  }

  useEffect(() => {
    if (shouldDisplay) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      document.getElementsByTagName('body')[0].style.height = '100%'
    } else {
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
      document.getElementsByTagName('body')[0].style.height = 'initial'
    }
  }, [shouldDisplay])

  return (
    <Wrapper shouldRotate={shouldDisplay} animate={animate}>
      <h1>Your Config</h1>
      <i className='bi bi-gear-fill' ref={gear} onClick={handleClick}></i>
      <ConfigWindow
        gear={gear.current as HTMLElement}
        shouldDisplay={shouldDisplay}
        setShouldDisplay={setShouldDisplay}
      />
      <Filter shouldDisplay={shouldDisplay}></Filter>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  & .bi-gear-fill {
    font-size: 30px;
    position: relative;
    top: 4px;
    transition: transform 0.03s ease-in-out;
    transition: color 0.2s ease-in-out;

    animation: ${({ animate, shouldRotate }: IconProps) =>
        shouldRotate ? 'spin' : animate ? 'spin-reverse' : 'none'}
      0.5s forwards ease-in-out;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(90deg);
      }
    }

    @keyframes spin-reverse {
      0% {
        transform: rotate(90deg);
      }

      100% {
        transform: rotate(0deg);
      }
    }
  }

  & .bi-gear-fill:hover {
    color: var(--color-primary);
    cursor: pointer;
  }
`

const Filter = styled.div`
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ shouldDisplay }: FilterProps) => (shouldDisplay ? '1' : '0')};
  background-color: #0000006d;
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  z-index: 2;
  top: 0;
  left: 0;
`
