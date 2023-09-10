import styled from 'styled-components'
import { auth } from '../firebase/config'
import { Spinner } from '../components/Spinner'
import { User, sendEmailVerification } from 'firebase/auth'
import { MessagePopUp } from '../components/MessagePopUp'
import { useParams } from 'react-router-dom'
import { setRegisterData } from '../firebase/setRegisterData'
import { secondsToMinutes } from '../functions/secondsToMinutes'
import { useAuthManagement } from '../hooks/useAuthManagement'

export const EmailVerification = () => {

  const { origin } = useParams()

  const {isLoading, shouldSendEmail, timeLeft, registerState} = useAuthManagement()

  const sendEmail = async () => {
    if (shouldSendEmail) {  
      try {
        if (registerState?.clicks === undefined) {
          await setRegisterData(0)
        } else {
          await setRegisterData(registerState.clicks)
        }
        await sendEmailVerification(auth.currentUser as User)
        console.log('email sent')
      } catch (error) {
        console.error(error)
        console.log('email not sent')
      }
    } else {
      console.log('email not sent')
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
          <button className={`form-button ${shouldSendEmail || 'form-button-disabled'}`} onClick={sendEmail}>
            {shouldSendEmail ? 're-send email' : 'send another in: ' + secondsToMinutes(timeLeft)}
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
