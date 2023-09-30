import { useContext } from 'react'
import { CirclePicker, ColorResult } from 'react-color'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../contexts/SaveConfigContext'

export const MobileColorPicker = () => {
  const { customizationDispatch } = useContext(CustomizationContext) as CustomizationContextType
  const { saveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType

  const handleOnChangeComplete = (color: ColorResult) => {
    customizationDispatch({ type: 'CHANGE_MAIN_COLOR', payload: color.hex })
    saveConfigDispatch({ type: 'SET_IS_SAVED', payload: false })
  }

  return <CirclePicker onChangeComplete={(color) => handleOnChangeComplete(color)} />
}
