import { useContext } from 'react'
import { CirclePicker, ColorResult } from 'react-color'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'

export const MobileColorPicker = () => {
  const { customizationDispatch } = useContext(CustomizationContext) as CustomizationContextType

  const handleOnChangeComplete = (color: ColorResult) => {
    customizationDispatch({ type: 'CHANGE_MAIN_COLOR', payload: color.hex })
    customizationDispatch({ type: 'SET_NEED_SAVE', payload: true })

  }

  return <CirclePicker onChangeComplete={(color) => handleOnChangeComplete(color)} />
}
