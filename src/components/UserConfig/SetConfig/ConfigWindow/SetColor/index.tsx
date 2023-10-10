import styled from 'styled-components'
import { ColorPicker } from './ColorPicker'
import { breakpoints } from '../../../../../utilities/breakpoints'
import { MobileColorPicker } from './MobileColorPicker'

export const SetColor = () => {
  return (
    <Wrapper>
      <ColorPicker />
      <MobileColorPicker />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & .chrome-picker {
    font-family: 'Roboto', sans-serif !important;
    border-radius: 5px !important;
    display: none !important;

    @media (min-width: ${(Number(breakpoints.tablet.slice(0, 3)) + 1).toString()}px) {
      display: initial !important;
    }
  }

  & .circle-picker {
    display: none !important;
    @media (max-width: ${breakpoints.tablet}) {
      display: flex !important;
    }
  }

  & .chrome-picker > div {
    border-radius: 5px 5px 0 0 !important;
  }
`
