import { ChromePicker, ColorResult } from "react-color"
import { CustomizationContext, CustomizationContextType } from "../../../../../contexts/CustomizationContext"
import { useContext } from "react"

interface Props {
  color: string
  mainColorIsChecked: boolean
}

export const ColorPicker = ({ color, mainColorIsChecked }: Props) => {
  const { customizationDispatch } = useContext(CustomizationContext) as CustomizationContextType

  const colorPickerHandleChange = (color: ColorResult) => {
    console.log(color)
    if (mainColorIsChecked) {
      customizationDispatch({ type: 'CHANGE_MAIN_COLOR', payload: color.hex })
    } else {
      customizationDispatch({ type: 'CHANGE_SECUNDARY_COLOR', payload: color.hex + '61'})
    }
  }

  return (
    <ChromePicker
      disableAlpha={true}
      color={color}
      onChange={(color) => colorPickerHandleChange(color)}
    />
  )
}