import { useContext, useEffect, useState } from 'react'
import { AccessContext, AccessContextType } from '../../contexts/AccessContext'
import { getTimeout } from '../../functions/getTimeout'
import { secondsToMinutes } from '../../functions/secondsToMinutes'
import { LoginContext, LoginContextType } from '../../contexts/LoginContext'
import { useNavigate } from 'react-router-dom'
import { FormContext, FormContextType } from '../../contexts/FormContext'
import { hasErrorOnSubmit } from '../../functions/formValidation'
import { login } from '../../functions/login'
import { register } from '../../functions/register'
import styled from 'styled-components'

interface SubmitButtonProps {
  inputsArray: Array<HTMLInputElement>
  setLoginError: (error: boolean) => void
}

interface StyledButtonProps {
  isAllowed: boolean
}

export const SubmitButton = ({ inputsArray, setLoginError }: SubmitButtonProps) => {
  const { accessState } = useContext(AccessContext) as AccessContextType
  const { isLogin } = useContext(LoginContext) as LoginContextType
  const { formDispatch, formState } = useContext(FormContext) as FormContextType

  const [waitTime, setWaitTime] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isAllowed, setIsAllowed] = useState<boolean>(true)

  const navigate = useNavigate()

  console.log(timeLeft)

  useEffect(() => {
    setWaitTime(getTimeout(accessState.attempts) + accessState.date)

    let myInterval: NodeJS.Timeout
    if (isLogin) {
      myInterval = setInterval(() => {
        setTimeLeft((waitTime - Math.round(Date.now() / 1000)) <= 0 ? 0 : waitTime - Math.round(Date.now() / 1000))
      }, 1000)
    }

    setIsAllowed(waitTime < Math.round(Date.now() / 1000))

    return () => clearInterval(myInterval)
  }, [accessState.date, accessState.attempts, isLogin, setWaitTime, waitTime, isAllowed, timeLeft])

  const handleClick = () => {
    if (isLogin) {
      login(hasErrorOnSubmit(formState), inputsArray, formDispatch, navigate, setLoginError, accessState)
    } else {
      register(hasErrorOnSubmit(formState), inputsArray, formDispatch, navigate)
    }
  }

  return (
    <Button className='form-button' onClick={handleClick} isAllowed={isAllowed}>
      {isLogin ? 'Access account' : 'Create account'}
    </Button>
  )
}

const Button = styled.button<StyledButtonProps>`
  cursor: ${(props) => (props.isAllowed ? 'pointer' : 'not-allowed')};
`
