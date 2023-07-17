import styled from 'styled-components'
import { forwardRef } from 'react'
import { ColorCheckBoxProps } from '../../../../../types/types'

export const CheckBox = forwardRef<HTMLInputElement, ColorCheckBoxProps>(
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
