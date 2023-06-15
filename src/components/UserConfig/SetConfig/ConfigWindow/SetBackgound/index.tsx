import styled from 'styled-components'
import { backgroundArray } from '../../../../../utilities/backgroundArray'
import { BackgroundOption } from './BackgroundOption'
import { breakpoints } from '../../../../../utilities/breakpoints'

export const SetBackground = () => {
  return (
    <Wrapper>
      {backgroundArray.map((background, index) => {
        return <BackgroundOption background={background} key={index} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 50px;
  }
`
