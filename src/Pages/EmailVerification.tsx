import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { auth, database } from '../firebase/config'
import { Spinner } from '../components/Spinner'
import { Unsubscribe, User, onAuthStateChanged, sendEmailVerification } from 'firebase/auth'
import { MessagePopUp } from '../components/MessagePopUp'
import { useParams } from 'react-router-dom'
import { setRegisterData } from '../firebase/setRegisterData'
import { onValue, ref } from 'firebase/database'
import { getRegisterTimeout } from '../functions/getRegisterTimeout'
import { getRegisterWaitTime } from '../functions/getRegisterWaitTime'
import { secondsToMinutes } from '../functions/secondsToMinutes'

interface RegisterState {
  clicks: number
  date: number
}

export const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [registerState, setRegisterState] = useState<null | RegisterState>(null)
  const [registerTimeout, setRegisterTimeout] = useState(0)
  const [registerWaitTime, setRegisterWaitTime] = useState(0)

  const { origin } = useParams()

  const timeLeft = registerWaitTime - registerTimeout

  useEffect(() => {
    window.document.title = 'StudyPom | Email Verification'
    let valueUnsubcribe: Unsubscribe

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (firebaseUser.emailVerified) {
          window.location.replace('/StudyPom')
        }
        valueUnsubcribe = onValue(ref(database, 'users/' + firebaseUser.uid + '/register'), (snapshot) => {
          setRegisterState(snapshot.val())
          if (snapshot.exists()) {
            setRegisterTimeout(getRegisterTimeout(snapshot.val().date))
          }
          setIsLoading(false)
        })
      } else {
        window.location.replace('/StudyPom/register')
      }
    })

    return () => {
      auth.signOut()
      unsubscribe()
      valueUnsubcribe()
    }
  }, [])

  useEffect(() => {
    const myInterval = setInterval(() => {
      setRegisterTimeout(registerTimeout + 1)
    }, 1000)
    if (timeLeft < 0) clearInterval(myInterval)
    return () => clearInterval(myInterval)
  }, [registerTimeout, registerWaitTime, timeLeft])

  useEffect(() => {
    if (registerState?.clicks) {
      setRegisterWaitTime(getRegisterWaitTime(registerState.clicks))
    }
    console.log(timeLeft)
  }, [registerState?.clicks, registerTimeout, registerWaitTime, timeLeft])

  const shouldSendEmail = timeLeft <= 0

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
