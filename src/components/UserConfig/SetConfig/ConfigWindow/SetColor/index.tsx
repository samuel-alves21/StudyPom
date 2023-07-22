import styled from 'styled-components'
import { useContext, useEffect, useRef, useState } from 'react'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { ColorPicker } from './ColorPicker'
import { CheckBox } from './CheckBox'
import { breakpoints } from '../../../../../utilities/breakpoints'
import { MobileColorPicker } from './MobileColorPicker'

export const SetColor = () => {
  const {
    customizationState: { mainColor, secundaryColor },
  } = useContext(CustomizationContext) as CustomizationContextType

  const [mainColorIsChecked, setMainColorIsChecked] = useState(true)
  const [secundaryColorIsChecked, setSecundaryColorIsChecked] = useState(true)

  const mainColorBox = useRef<null | HTMLInputElement>(null)
  const secundaryColorBox = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    if (mainColorBox.current && secundaryColorBox.current) {
      mainColorBox.current.checked = mainColorIsChecked
      secundaryColorBox.current.checked = secundaryColorIsChecked
    }
  }, [mainColorIsChecked, secundaryColorIsChecked])

  const color = mainColorIsChecked ? mainColor : secundaryColor

  const checkBoxProps = {
    setMainColorIsChecked: setMainColorIsChecked,
    setSecundaryColorIsChecked: setSecundaryColorIsChecked,
    mainColorIsChecked: mainColorIsChecked,
    secundaryColorIsChecked: secundaryColorIsChecked,
  }

  return (
    <Wrapper>
      <ColorOptionsWrapper>
        <div>
          <label htmlFor='main-color'>main color</label>
          <CheckBox {...checkBoxProps} ref={mainColorBox} id='main-color' />
        </div>
        <div>
          <label htmlFor='secundary-color'>secundary color</label>
          <CheckBox {...checkBoxProps} ref={secundaryColorBox} id='secundary-color' />
        </div>
      </ColorOptionsWrapper>
      <ColorPicker
        color={color}
        mainColorIsChecked={mainColorIsChecked}
        secundaryColorIsChecked={secundaryColorIsChecked}
      />
      <MobileColorPicker mainColorIsChecked={mainColorIsChecked} secundaryColorIsChecked={secundaryColorIsChecked} />
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

const ColorOptionsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 0 100px;
  margin-bottom: 20px;

  & label,
  & input {
    cursor: pointer;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 10px;
  }
`
