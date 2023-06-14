import styled from 'styled-components'
import { backgroundArray } from '../../../../../utilities/backgroundArray'
import { BackgroundOption } from './BackgroundOption'

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
  gap: 20px;
`
