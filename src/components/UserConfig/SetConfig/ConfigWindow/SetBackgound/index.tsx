import styled from 'styled-components'
import { backgroundArray } from '../../../../../utilities/backgroundArray'
import { BackgroundOption } from './BackgroundOption'
import { breakpoints } from '../../../../../utilities/breakpoints'
import { RangeInputs } from './RangeInputs'
import { UploadBackgroundBtn } from './UploadBackgroundBtn'

export const SetBackground = () => {
  return (
    <Wrapper>
      <RangeInputs />
      <BackgroundsWrapper>
        {backgroundArray.map((background, index) => {
          return <BackgroundOption background={background} key={index} />
        })}
      </BackgroundsWrapper>
      <UploadBackgroundBtn />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const BackgroundsWrapper = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-1);

  @media (max-width: ${breakpoints.tablet}) {
    gap: 50px;
  }
`
