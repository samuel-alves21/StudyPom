import styled from 'styled-components'
import { soundsArray } from '../../../../../utilities/soundsArray'
import { AudioOption } from './AudioOption'
import { breakpoints } from '../../../../../utilities/breakpoints'
import { VolumeBar } from './VolumeBar'

export const SetAudio = () => {
  return (
    <Wrapper>
      <VolumeBar />
      <SoundsWrapper>
        {soundsArray.map((value, index) => (
          <AudioOption key={index} sounds={value} />
        ))}
      </SoundsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-1);
`

const SoundsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: ${breakpoints.mobile}) {
    align-items: center;
    justify-content: center;
  }
`
