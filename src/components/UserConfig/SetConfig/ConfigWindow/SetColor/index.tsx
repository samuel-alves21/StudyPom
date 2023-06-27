import { ChromePicker } from 'react-color'
import { useContext, useEffect, useRef, useState } from 'react'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import styled from 'styled-components'

export const SetColor = () => {
  const { customizationDispatch, customizationState: { color } } = useContext(CustomizationContext) as CustomizationContextType

  const [mainColorIsChecked, setMainColorIsChecked] = useState(true)
  const [secundaryColorIsChecked, setSecundaryColorIsChecked] = useState(false)

  const mainColor = useRef(null)
  const secundaryColor = useRef(null)

  useEffect(() => {
    mainColor.current.checked = mainColorIsChecked
    secundaryColor.current.checked = secundaryColorIsChecked 
  }, [mainColorIsChecked, secundaryColorIsChecked])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'main-color') {
    }
  }

  return (
    <Wrapper>
      <ColorOptionsWrapper>
        <div>
          <label htmlFor="main-color">main color</label>
          <CheckBox type="checkbox" id="main-color" ref={mainColor} onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label htmlFor="secundary-color">secundary color</label>
          <CheckBox type="checkbox" id="secundary-color" ref={secundaryColor} onChange={(e) => handleChange(e)} />
        </div>
      </ColorOptionsWrapper>
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

const ColorOptionsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 0 100px;
  margin-bottom: 10px;

  & label, 
  & input {
    cursor: pointer;
  }
`

const CheckBox = styled.input`
  margin-left: 5px;
` 