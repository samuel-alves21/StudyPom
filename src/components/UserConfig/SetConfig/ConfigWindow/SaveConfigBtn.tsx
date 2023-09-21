import { useContext } from "react"
import { CustomizationContext, CustomizationContextType } from "../../../../contexts/CustomizationContext"

export const SaveConfigBtn = () => {
  const { customizationDispatch, customizationState: { needSave } } = useContext(CustomizationContext) as CustomizationContextType

  const handleSaveConfig = () => {
    customizationDispatch({ type: 'SET_NEED_SAVE', payload: false })
  }

  return (
    <button onClick={handleSaveConfig}  disabled={!needSave}>
      Save
    </button>
  )
}