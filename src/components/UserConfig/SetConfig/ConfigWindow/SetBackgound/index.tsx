import styled from 'styled-components'
import { RangeInputs } from './RangeInputs'
import { UploadBackgroundBtn } from './UploadBackgroundBtn'

export const SetBackground = () => {
  return (
    <Wrapper>
      <RangeInputs />
      <UploadBackgroundBtn />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: min(600px, 80vw)
`

