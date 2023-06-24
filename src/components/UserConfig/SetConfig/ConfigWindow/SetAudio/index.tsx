import styled from 'styled-components'
import { soundsArray } from '../../../../../utilities/soundsArray'
import { AudioOption } from './AudioOption'
import { breakpoints } from '../../../../../utilities/breakpoints'

export const SetAudio = () => {
  return (
    <Wrapper>
      {soundsArray.map((value, index) => (
        <AudioOption key={index} sounds={value} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 10px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`
