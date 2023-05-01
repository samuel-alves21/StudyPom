import styled from 'styled-components'
import { useState, useRef } from 'react'
import { ConfigWindow } from './ConfigWindow'

interface FilterProps {
  shouldDisplay: boolean
}

interface IconProps {
  shouldRotate: boolean
}

export const ConfigsHeading = () => {
  const gear = useRef<HTMLElement | null>(null)

  const [shouldDisplay, setShouldDisplay] = useState(false)

  return (
    <Wrapper shouldRotate={shouldDisplay}>
      <h1>Your Config</h1>
      <i
        className='bi bi-gear-fill'
        ref={gear}
        onClick={() => setShouldDisplay(!shouldDisplay)}
      ></i>
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

    animation: ${(props: IconProps) =>
        props.shouldRotate ? 'spin' : 'spin-reverse'}
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
  opacity: ${(props: FilterProps) => (props.shouldDisplay ? '1' : '0')};
  background-color: #00000029;
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  z-index: 2;
  top: 0;
  left: 0;
`
