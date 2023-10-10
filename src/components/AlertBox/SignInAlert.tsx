import { useContext } from 'react'
import { SaveConfigContext, SaveConfigContextType } from '../../contexts/SaveConfigContext'

export const SignInAlert = () => {
  const { saveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType

  const handleClick = () => {
    saveConfigDispatch({ type: 'REMOVE_ALERT' })
    window.location.href = '/StudyPom/register'
  }

  return (
    <>
      <h3>To upload you have to sign in first. Please sign in to continue.</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleClick}>Sign in now</button>
        <button onClick={() => saveConfigDispatch({ type: 'REMOVE_ALERT' })}>maybe later</button>
      </div>
    </>
  )
}
