import { ChromePicker, ColorResult } from 'react-color'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { useContext } from 'react'

export const ColorPicker = () => {
  

  const { customizationState: { mainColor }, customizationDispatch } = useContext(CustomizationContext) as CustomizationContextType

  const handleChange = (color: ColorResult) => {
    customizationDispatch({ type: 'CHANGE_MAIN_COLOR', payload: color.hex })
  }

  return <ChromePicker disableAlpha={true} color={mainColor.slice(0, 7)} onChange={(color) => handleChange(color)} />
}
