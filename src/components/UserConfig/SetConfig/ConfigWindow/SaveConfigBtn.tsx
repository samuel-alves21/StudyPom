import { useContext } from "react"
import { SaveConfigContext, SaveConfigContextType } from "../../../../contexts/SaveConfigContext"

export const SaveConfigBtn = () => {
  const { isSaved, setIsSaved } = useContext(SaveConfigContext) as SaveConfigContextType

  const handleClick = () => {
    setIsSaved(true)
  }

  return (
    <button disabled={isSaved} onClick={handleClick}>
      Save
    </button>
  )
}