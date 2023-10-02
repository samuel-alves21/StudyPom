import { useContext } from 'react'
import { CirclePicker, ColorResult } from 'react-color'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../contexts/SaveConfigContext'

export const MobileColorPicker = () => {
  const { saveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType

  const handleOnChangeComplete = (color: ColorResult) => {
    saveConfigDispatch({ type: 'STAGE_COLOR', payload: color.hex })
    saveConfigDispatch({ type: 'SET_IS_SAVED', payload: false })
  }

  return <CirclePicker onChangeComplete={(color) => handleOnChangeComplete(color)} />
}
