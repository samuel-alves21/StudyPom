import { ChromePicker, ColorResult } from 'react-color'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { useContext } from 'react'

interface Props {
  color: string
  mainColorIsChecked: boolean
  secundaryColorIsChecked: boolean
}

export const ColorPicker = ({ color, mainColorIsChecked, secundaryColorIsChecked }: Props) => {
  const { customizationDispatch } = useContext(CustomizationContext) as CustomizationContextType

  const handleChange = (color: ColorResult) => {
    mainColorIsChecked && customizationDispatch({ type: 'CHANGE_MAIN_COLOR', payload: color.hex })
    secundaryColorIsChecked && customizationDispatch({ type: 'CHANGE_SECUNDARY_COLOR', payload: color.hex + '61' })
  }

  return <ChromePicker disableAlpha={true} color={color} onChange={(color) => handleChange(color)} />
}
