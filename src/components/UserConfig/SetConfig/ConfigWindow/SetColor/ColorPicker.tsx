import { ChromePicker, ColorResult } from 'react-color'
import { useContext } from 'react'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../contexts/SaveConfigContext'

export const ColorPicker = () => {
  const {
    saveConfigDispatch,
    SaveConfigState: { stagedColor },
  } = useContext(SaveConfigContext) as SaveConfigContextType

  const handleChange = (color: ColorResult) => {
    saveConfigDispatch({ type: 'STAGE_COLOR', payload: color.hex })
    saveConfigDispatch({ type: 'SET_IS_SAVED', payload: false })
  }

  return <ChromePicker disableAlpha={true} color={stagedColor.slice(0, 7)} onChange={(color) => handleChange(color)} />
}
