import styled from 'styled-components'
import { auth } from '../firebase/config'
import { Spinner } from '../components/Spinner'
import { User, sendEmailVerification } from 'firebase/auth'
import { MessagePopUp } from '../components/MessagePopUp'
import { useParams } from 'react-router-dom'
import { secondsToMinutes } from '../functions/secondsToMinutes'
import { useContext, useState } from 'react'
import { setAttemptsData } from '../firebase/setAttemptsData'
import { useTimeout } from '../hooks/useTimeout'
import { LoginContext, LoginContextType } from '../contexts/LoginContext'

export const EmailVerification = () => {
  window.document.title = 'StudyPom | Email Verification'

  const [isLoading, setIsLoading] = useState(true)
  const { isLogin, setIsLogin } = useContext(LoginContext) as LoginContextType
  const { origin } = useParams()
  const { attempts, isAllowed, timeLeft, firstAttemptState } = useTimeout(isLogin, 'verification', setIsLoading)

  setIsLogin(false)

  const handleSubmit = async () => {
    if (isAllowed) {
      try {
        await sendEmailVerification(auth.currentUser as User)
        await setAttemptsData(attempts, firstAttemptState, 'verification')
        // eslint-disable-next-line
      } catch (error: any) {
        if (error.code === 'auth/too-many-requests') {
          await setAttemptsData(attempts, firstAttemptState, 'verification')
        } else {
          console.error(error)
        }
      }
    } else {
      console.error('email not sent')
      return
    }
  }

  return (
    <Wrapper className='flex-all-center'>
      <MessagePopUp
        text={
          origin === 'register'
            ? 'Your account has been created successfully. Please check your email for further instructions.'
            : 'Verify your email to continue.'
        }
        success={origin === 'register' ? true : false}
      />
      {isLoading ? (
        <Spinner darkBackground={false} displayOnFirstLoad={true} />
      ) : (
        <ContentWrapper className='styled-page-box flex-all-center'>
          <h1>Email Verification</h1>
          <p>Please check your email and click on the link to verify your email to continue.</p>
          <p>If you don't receive an email, please check your spam folder.</p>
          <button className={`form-button ${isAllowed || 'form-button-disabled'}`} onClick={handleSubmit}>
            {isAllowed ? 're-send email' : 'send another in: ' + secondsToMinutes(timeLeft)}
          </button>
        </ContentWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: radial-gradient(circle, rgba(214, 78, 219, 1) 21%, rgba(176, 50, 233, 1) 97%);
  min-height: 100vh;
  padding: 15px;
  text-align: center;
`

const ContentWrapper = styled.div`
  gap: var(--gap-1);
  flex-direction: column;
  position: relative;

  & > h1 {
    color: var(--color-primary);
  }

  & button {
    max-width: 200px;
  }
`
