import styled from 'styled-components'
import { DetailsType } from './DetailsType'

export const Details = () => {
  return (
    <DetailsWrapper>
      <DetailsType text='time worked' />
      <DetailsType text='cycles finished' />
    </DetailsWrapper>
  )
}

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  width: 100%;
`
