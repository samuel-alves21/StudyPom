import styled from 'styled-components'
import { SpinnerCircular } from 'spinners-react'

interface SpinnerProps {
  darkBackground: boolean
  displayOnFirstLoad: boolean
}

export const Spinner = ({ darkBackground, displayOnFirstLoad }: SpinnerProps) => {
  return (
    <SpinnerWrapper
      className='spinner'
      id='spinner'
      darkBackground={darkBackground}
      displayOnFirstLoad={displayOnFirstLoad}
    >
      <SpinnerCircular speed={150} color={'#cc66fc'} size={100} />
    </SpinnerWrapper>
  )
}

const SpinnerWrapper = styled.div<SpinnerProps>`
  background-color: ${({ darkBackground }) => (darkBackground ? '#00000060' : '#fff')};
  position: absolute;
  display: ${({ displayOnFirstLoad }) => (displayOnFirstLoad ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  z-index: 100;

  &::before {
    width: 100%;
    min-height: 100%;
    z-index: 99;
    filter: blur(50px);
  }
`
