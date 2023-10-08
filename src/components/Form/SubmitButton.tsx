import { useContext } from 'react'
import { AccessContext, AccessContextType } from '../../contexts/AccessContext'
import { secondsToMinutes } from '../../functions/secondsToMinutes'
import { LoginContext, LoginContextType } from '../../contexts/LoginContext'
import { useNavigate } from 'react-router-dom'
import { FormContext, FormContextType } from '../../contexts/FormContext'
import { hasErrorOnSubmit } from '../../functions/formValidation'
import { login } from '../../functions/login'
import { register } from '../../functions/register'
import { useTimeout } from '../../hooks/useTimeout'

interface SubmitButtonProps {
  inputsArray: Array<HTMLInputElement>
  setLoginError: (error: boolean) => void
}

export const SubmitButton = ({ inputsArray, setLoginError }: SubmitButtonProps) => {
  const { accessState } = useContext(AccessContext) as AccessContextType
  const { isLogin } = useContext(LoginContext) as LoginContextType
  const { formDispatch, formState } = useContext(FormContext) as FormContextType

  const navigate = useNavigate()

  const { isAllowed, timeLeft } = useTimeout(isLogin, 'login')

  const handleClick = () => {
    if (isLogin) {
      if (!isAllowed) return
      login(hasErrorOnSubmit(formState), inputsArray, formDispatch, navigate, setLoginError, accessState)
    } else {
      register(hasErrorOnSubmit(formState), inputsArray, formDispatch, navigate)
    }
  }

  return (
    <button className={`form-button ${isAllowed || 'form-button-disabled'}`} onClick={handleClick}>
      {isLogin ? (isAllowed ? 'Access account' : `try again in: ${secondsToMinutes(timeLeft)}`) : 'Create account'}
    </button>
  )
}
