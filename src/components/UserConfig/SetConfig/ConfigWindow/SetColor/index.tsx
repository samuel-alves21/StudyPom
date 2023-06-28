import { ChromePicker, ColorResult } from 'react-color'
import { useContext, useEffect, useRef, useState } from 'react'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import styled from 'styled-components'

export const SetColor = () => {
  const {
    customizationDispatch,
    customizationState: { mainColor, secundaryColor },
  } = useContext(CustomizationContext) as CustomizationContextType

  const [mainColorIsChecked, setMainColorIsChecked] = useState(true)
  const [secundaryColorIsChecked, setSecundaryColorIsChecked] = useState(false)
  const [theClickedOne, setTheClikedOne] = useState<'main' | 'secundary' | null>(null)

  const mainColorBox = useRef<null | HTMLInputElement>(null)
  const secundaryColorBox = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    if (mainColorBox.current && secundaryColorBox.current) {
      if (!mainColorIsChecked && !secundaryColorIsChecked) {
        theClickedOne === 'main'
          ? setMainColorIsChecked(true)
          : setSecundaryColorIsChecked(true)
      }
      mainColorBox.current.checked = mainColorIsChecked
      secundaryColorBox.current.checked = secundaryColorIsChecked
    }
  }, [mainColorIsChecked, secundaryColorIsChecked, theClickedOne])

  const checkBoxHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'main-color') {
      if (!mainColorBox.current?.checked) {
        setMainColorIsChecked(false)
        setTheClikedOne('main')
      } else {
        setMainColorIsChecked(true)
        setSecundaryColorIsChecked(false)
      }
    } 
    else {
      if (!secundaryColorBox.current?.checked) {
        setTheClikedOne('secundary')
        setSecundaryColorIsChecked(false)
      } else {
        setMainColorIsChecked(false)
        setSecundaryColorIsChecked(true)
      }
    }
  }

  const colorPickerHandleChange = (color: ColorResult) => {
    console.log(color)
    if (mainColorIsChecked) {
      customizationDispatch({ type: 'CHANGE_MAIN_COLOR', payload: color.hex })
    } else {
      customizationDispatch({ type: 'CHANGE_SECUNDARY_COLOR', payload: color.hex + '61'})
    }
  }

  const color = mainColorIsChecked ? mainColor : secundaryColor

  return (
    <Wrapper>
      <ColorOptionsWrapper>
        <div>
          <label htmlFor='main-color'>main color</label>
          <CheckBox type='checkbox' id='main-color' ref={mainColorBox} onChange={(e) => checkBoxHandleChange(e)} />
        </div>
        <div>
          <label htmlFor='secundary-color'>secundary color</label>
          <CheckBox
            type='checkbox'
            id='secundary-color'
            ref={secundaryColorBox}
            onChange={(e) => checkBoxHandleChange(e)}
          />
        </div>
      </ColorOptionsWrapper>
      <ChromePicker
        disableAlpha={true}
        color={color}
        onChange={(color) => colorPickerHandleChange(color)}
      />
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
