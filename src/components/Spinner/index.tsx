import styled from 'styled-components'
import { SpinnerCircular } from 'spinners-react'

export const Spinner = () => {
  return (
    <SpinnerWrapper className='spinner' id='spinner'>
      <SpinnerCircular speed={150} color={'#cc66fc'} size={100} />
    </SpinnerWrapper>
  )
}

const SpinnerWrapper = styled.div`
  background-color: #00000060;
  position: absolute;
  display: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  z-index: 100;

  &::before {
    width: 100%;
    height: 100vh;
    z-index: 99;
    filter: blur(50px);
  }
`
