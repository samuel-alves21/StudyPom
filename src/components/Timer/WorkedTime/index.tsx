import styled from 'styled-components'
import { Details } from './Details'

export const WorkedTime = () => {
  return (
    <DetailsWrapper className='worked-time'>
      <Details text='time worked' />
      <Details text='cycles finished' />
    </DetailsWrapper>
  )
}

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  width: 100%;
`
