import styled from 'styled-components'
import { forwardRef } from 'react'

interface Props {
  setMainColorIsChecked: (value: boolean) => void
  setSecundaryColorIsChecked: (value: boolean) => void
  mainColorIsChecked: boolean
  secundaryColorIsChecked: boolean
  id: 'main-color' | 'secundary-color'
}

export const CheckBox = forwardRef<HTMLInputElement, Props>(
  ({ setMainColorIsChecked, id, setSecundaryColorIsChecked }, ref) => {
    const checkBoxHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.id === 'main-color') {
        if (e.target.checked) {
          setMainColorIsChecked(true)
        } else {
          setMainColorIsChecked(false)
          setSecundaryColorIsChecked(true)
        }
      } else {
        if (e.target.checked) {
          setSecundaryColorIsChecked(true)
        } else {
          setMainColorIsChecked(true)
          setSecundaryColorIsChecked(false)
        }
      }
    }

    return <Box type='checkbox' id={id} onChange={(e) => checkBoxHandleChange(e)} ref={ref} />
  }
)

const Box = styled.input`
  margin-left: 5px;
`
