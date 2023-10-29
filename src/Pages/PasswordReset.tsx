import styled from 'styled-components'
import { breakpoints } from '../utilities/breakpoints'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useContext, useState } from 'react'
import { Spinner } from '../components/Spinner'
import { setAttemptsData } from '../firebase/setAttemptsData'
import { secondsToMinutes } from '../functions/secondsToMinutes'
import { useTimeout } from '../hooks/useTimeout'
import { LoginContext, LoginContextType } from '../contexts/LoginContext'
import { MessagePopUp } from '../components/MessagePopUp'

interface ErrorProps {
  error: boolean
}

interface ErrorMessage {
  msg: string
}

export const PasswordReset = () => {
  window.document.title = 'StudyPom | Password reset'

  const [isLoading, setIsLoading] = useState(true)
  const { isLogin, setIsLogin } = useContext(LoginContext) as LoginContextType
  const { attempts, isAllowed, timeLeft, firstAttemptState } = useTimeout(isLogin, 'password', setIsLoading)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [popUpMessage, setPopUpMessage] = useState('')
  const [issSuccess, setIsSuccess] = useState(false)

  setIsLogin(false)

  const handleClick = () => {
    const input = document.getElementById('password-recover-input') as HTMLInputElement
    input.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = document.getElementById('password-recover-input') as HTMLInputElement
    if (e.key === 'Enter') {
      handleSubmit()
    }
    if (e.key === 'Escape') {
      input.blur()
    }
  }

  const clearText = () => {
    const input = document.getElementById('password-recover-input') as HTMLInputElement
    input.value = ''
    input.focus()
  }

  const handleSubmit = async () => {
    const input = document.getElementById('password-recover-input') as HTMLInputElement
    const messagePopUp = document.getElementById('message-pop-up') as HTMLDivElement
    messagePopUp.style.display = 'none'
    if (!isAllowed) return
    if (!input.value) {
      setError(true)
      setErrorMsg('Empty Field')
      return
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(input.value)) {
      setError(true)
      setErrorMsg('Invalid Email')
      return
    }
    const spinner = document.getElementById('spinner') as HTMLDivElement
    spinner.style.display = 'flex'

    setError(false)
    setErrorMsg('')
    try {
      await setAttemptsData(attempts, firstAttemptState, 'password')
      await sendPasswordResetEmail(auth, input.value)
      input.value = ''
      setIsSuccess(true)
      setPopUpMessage('Email sent successfully! Please check your inbox.')
      //eslint-disable-next-line 
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        await setAttemptsData(attempts, firstAttemptState, 'password')
        setIsSuccess(true)
        setPopUpMessage('Email sent successfully! Please check your inbox.')
        input.value = ''
      } else {
        console.dir(error)
        setIsSuccess(false)
        setPopUpMessage('Something went wrong, please try again later')
      }
    }
    messagePopUp.style.display = 'initial'
    spinner.style.display = 'none'
  }

  return (
    <Wrapper className='flex-all-center'>
      <MessagePopUp success={issSuccess} text={popUpMessage}/> 
      {isLoading && <Spinner darkBackground={false} displayOnFirstLoad={true} />}
      <Spinner darkBackground={true} displayOnFirstLoad={false} />
      <ContentWrapper className='styled-page-box flex-all-center'>
        <h1>Password Reset</h1>
        <span onClick={handleClick}>Enter with your email:</span>
        <InputWrapper error={error} msg={errorMsg}>
          <input type='text' id='password-recover-input' onKeyDown={(e) => handleKeyDown(e)} />
          <i className='bi bi-x' onClick={clearText}></i>
          <Error error={error} className='error'>* {errorMsg}</Error>
        </InputWrapper>
        <button className={`form-button ${isAllowed || 'form-button-disabled'}`} onClick={handleSubmit}>
          {isAllowed ? 'send Email' : `try again in: ${secondsToMinutes(timeLeft)}`}
        </button>
        <p>If you didn't receive an email, please check your spam folder.</p>
      </ContentWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: radial-gradient(circle, rgba(214, 78, 219, 1) 21%, rgba(176, 50, 233, 1) 97%);
  min-height: 100vh;
  padding: 15px;
  text-align: center;
  padding: 10px;
`

const ContentWrapper = styled.div`
  gap: var(--gap-1);
  flex-direction: column;
  position: relative;

  & button {
    width: 250px;
  }

  & input {
    background-color: transparent;
    flex-grow: 1;
    width: 90%;
  }

  & h1 {
    color: var(--color-primary);
  }

  & span {
    cursor: pointer;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 60px 10px;
  }
`

const InputWrapper = styled.div<ErrorProps & ErrorMessage>`
  display: flex;
  background-color: #fff;
  width: 250px;
  margin-top: -10px;
  padding: 2px;
  position: relative;
  margin-bottom: ${({ error }) => error ? '20px' : '0'} ;

  & .bi-x {
    font-size: 25px;
    color: var(--color-primary);
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`

const Error = styled.p<ErrorProps>`
  position: absolute;
  bottom: -25px;
  display: ${({ error }) => error ? 'inital' : 'none' };
  font-size: 16px;
`
