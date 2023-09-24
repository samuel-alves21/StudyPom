import styled from 'styled-components'
import { useState, useRef, useContext } from 'react'
import { ConfigWindow } from './ConfigWindow'
import { Filter } from './Filter'
import { SaveConfigContext, SaveConfigContextType } from '../../../contexts/SaveConfigContext'

interface GearIconProps {
  shouldRotate: boolean
  animate: boolean
}

export const ConfigHeading = () => {
  const gear = useRef<HTMLElement | null>(null)

  const [shouldDisplay, setShouldDisplay] = useState(false)
  const [animate, setAnimate] = useState(false)

  const handleClick = () => {
    setShouldDisplay(true)
    setAnimate(true)
  }

  const {
    SaveConfigState: { isSaved },
  } = useContext(SaveConfigContext) as SaveConfigContextType
  console.log(isSaved)

  return (
    <Wrapper className='config-wrapper' shouldRotate={shouldDisplay} animate={animate}>
      <h1 className='config-heading'> Your Config</h1>
      <i className='bi bi-gear-fill' ref={gear} onClick={handleClick}></i>
      <ConfigWindow
        gear={gear.current as HTMLElement}
        shouldDisplay={shouldDisplay}
        setShouldDisplay={setShouldDisplay}
      />
      <Filter className='filter' shouldDisplay={shouldDisplay}></Filter>
    </Wrapper>
  )
}

const Wrapper = styled.div<GearIconProps>`
  display: flex;
  align-items: center;
  gap: 15px;

  & .bi-gear-fill {
    font-size: 30px;
    position: relative;
    top: 4px;
    transition: transform 0.03s ease-in-out;
    transition: color 0.2s ease-in-out;
    animation: ${({ animate, shouldRotate }) => (shouldRotate ? 'spin' : animate ? 'spin-reverse' : 'none')} 0.5s
      forwards ease-in-out;

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

  @media (hover: hover) and (pointer: fine) {
    & .bi-gear-fill:hover {
      color: var(--color-primary);
      cursor: pointer;
    }
  }
`
