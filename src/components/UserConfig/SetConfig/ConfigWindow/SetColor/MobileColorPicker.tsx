import { useContext } from 'react'
import { CirclePicker, ColorResult } from 'react-color'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { MobileColorPickerProps } from '../../../../../types/types'

export const MobileColorPicker = ({ mainColorIsChecked, secundaryColorIsChecked }: MobileColorPickerProps) => {
  const { customizationDispatch } = useContext(CustomizationContext) as CustomizationContextType

  const handleOnChangeComplete = (color: ColorResult) => {
    mainColorIsChecked && customizationDispatch({ type: 'CHANGE_MAIN_COLOR', payload: color.hex })
    secundaryColorIsChecked && customizationDispatch({ type: 'CHANGE_SECUNDARY_COLOR', payload: color.hex + '61' })
  }

  return <CirclePicker onChangeComplete={(color) => handleOnChangeComplete(color)} />
}
