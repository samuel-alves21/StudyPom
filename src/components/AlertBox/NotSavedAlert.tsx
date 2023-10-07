import { useContext } from "react"
import { SaveConfigContext, SaveConfigContextType } from "../../contexts/SaveConfigContext"

export const NotSavedAlert = () => {
  const { saveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType

  return (
    <>
      <h3>Please save or reset your config before exiting</h3>
      <button className='save-alert' onClick={() => saveConfigDispatch({ type: 'REMOVE_ALERT' })}>ok</button>
    </>

  )
}