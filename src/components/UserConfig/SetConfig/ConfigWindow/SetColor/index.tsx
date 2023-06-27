import { ChromePicker } from 'react-color'
import { useContext } from 'react'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import styled from 'styled-components'

export const SetColor = () => {
  const { customizationDispatch, customizationState: { color } } = useContext(CustomizationContext) as CustomizationContextType

  return (
    <Wrapper>
      <ChromePicker disableAlpha={true} color={color} onChange={ (color) => customizationDispatch({ type: 'CHANGE_COLOR', payload: color.hex }) }/>
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
  }

  & .chrome-picker > div {
    border-radius: 5px 5px 0 0 !important;
  }
`