import styled from 'styled-components'
import { backgroundArray } from '../../../../../utilities/backgroundArray'
import { BackgroundOption } from './BackgroundOption'
import { breakpoints } from '../../../../../utilities/breakpoints'
import { RangeInputs } from './RangeInputs'

export const SetBackground = () => {
  return (
    <Wrapper>
      <RangeInputs />
      <BackgroundsWrapper>
        {backgroundArray.map((background, index) => {
          return <BackgroundOption background={background} key={index} />
        })}
      </BackgroundsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const BackgroundsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 50px;
  }
`