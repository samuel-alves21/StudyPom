import { SpinnerCircular } from 'spinners-react'
import styled from 'styled-components'

interface SpinnerProps {
  mainColor: string
}

export const Spinner = ({ mainColor }: SpinnerProps) => {
  return (
    <SpinnerWrapper className='spinner'>
      <SpinnerCircular speed={150} color={mainColor} size={100} />
    </SpinnerWrapper>
  )
}

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`
