import { ChromePicker, ColorResult } from 'react-color'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { useContext } from 'react'
import { MobileColorPickerProps } from './MobileColorPicker'

interface ColorPickerProp extends MobileColorPickerProps {
  color: string
}

export const ColorPicker = ({ color, mainColorIsChecked, secundaryColorIsChecked }: ColorPickerProp) => {
  const { customizationDispatch } = useContext(CustomizationContext) as CustomizationContextType

  const handleChange = (color: ColorResult) => {
    mainColorIsChecked && customizationDispatch({ type: 'CHANGE_MAIN_COLOR', payload: color.hex })
    secundaryColorIsChecked && customizationDispatch({ type: 'CHANGE_SECUNDARY_COLOR', payload: color.hex + '61' })
  }

  return <ChromePicker disableAlpha={true} color={color.slice(0, 7)} onChange={(color) => handleChange(color)} />
}
