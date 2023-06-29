import { useContext, useEffect, useRef, useState } from 'react'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { ColorPicker } from './ColorPicker'
import { CheckBox } from './CheckBox'
import styled from 'styled-components'
import { breakpoints } from '../../../../../utilities/breakpoints'

export const SetColor = () => {
  const {
    customizationState: { mainColor, secundaryColor },
  } = useContext(CustomizationContext) as CustomizationContextType

  const [mainColorIsChecked, setMainColorIsChecked] = useState(true)
  const [secundaryColorIsChecked, setSecundaryColorIsChecked] = useState(false)

  const mainColorBox = useRef<null | HTMLInputElement>(null)
  const secundaryColorBox = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    if (mainColorBox.current && secundaryColorBox.current) {
      mainColorBox.current.checked = mainColorIsChecked
      secundaryColorBox.current.checked = secundaryColorIsChecked
    }
  }, [mainColorIsChecked, secundaryColorIsChecked])

  const color = mainColorIsChecked ? mainColor : secundaryColor

  return (
    <Wrapper>
      <ColorOptionsWrapper>
        <div>
          <label htmlFor='main-color'>main color</label>
          <CheckBox
            setMainColorIsChecked={setMainColorIsChecked}
            setSecundaryColorIsChecked={setSecundaryColorIsChecked}
            mainColorIsChecked={mainColorIsChecked}
            secundaryColorIsChecked={secundaryColorIsChecked}
            ref={mainColorBox}
            id='main-color'
          />
        </div>
        <div>
          <label htmlFor='secundary-color'>secundary color</label>
          <CheckBox
            setMainColorIsChecked={setMainColorIsChecked}
            setSecundaryColorIsChecked={setSecundaryColorIsChecked}
            mainColorIsChecked={mainColorIsChecked}
            secundaryColorIsChecked={secundaryColorIsChecked}
            ref={secundaryColorBox}
            id='secundary-color'
          />
        </div>
      </ColorOptionsWrapper>
      <ColorPicker color={color} mainColorIsChecked={mainColorIsChecked} />
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
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 10px;
  }
`
