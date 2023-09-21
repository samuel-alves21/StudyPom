import { ChromePicker, ColorResult } from 'react-color'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { useContext } from 'react'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../contexts/SaveConfigContext'

export const ColorPicker = () => {
  
  const { setIsSaved } = useContext(SaveConfigContext) as SaveConfigContextType
  const { customizationState: { mainColor }, customizationDispatch } = useContext(CustomizationContext) as CustomizationContextType

  const handleChange = (color: ColorResult) => {
    customizationDispatch({ type: 'CHANGE_MAIN_COLOR', payload: color.hex })
    setIsSaved(false)
  }

  return <ChromePicker disableAlpha={true} color={mainColor.slice(0, 7)} onChange={(color) => handleChange(color)} />
}
