import styled from 'styled-components'
import { breakpoints } from '../utilities/breakpoints'
import { Unsubscribe, sendPasswordResetEmail } from 'firebase/auth'
import { auth, database } from '../firebase/config'
import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { getIp } from '../functions/getIp'
import { Spinner } from '../components/Spinner'
import { setAttemptsData } from '../firebase/setAttemptsData'
import { getRegisterWaitTime } from '../functions/getRegisterWaitTime'
import { secondsToMinutes } from '../functions/secondsToMinutes'

export const PasswordReset = () => {

  window.document.title = 'StudyPom | Password reset'

  const [isLoading, setIsLoading] = useState(true)
  const [attempts, setAttempts] = useState(0)
  const [lastAttemptDate, setLastAttemptDate] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    let unsubscribe: Unsubscribe
    const asyncFn = async () => {
      const ip = await getIp()
      unsubscribe = onValue(ref(database, `timeouts/password/ips/${ip}`), (snapshot) => {
        if (snapshot.exists()) {
          const values = snapshot.val()
          setAttempts(values.attempts)
          setLastAttemptDate(values.date)
        }
        setIsLoading(false)
      })
    }
    asyncFn()
    return () => unsubscribe && unsubscribe()
  }, [])

  useEffect(() => {
    const waitTime = getRegisterWaitTime(attempts) + lastAttemptDate

    const myInterval = setInterval(() => {
      setTimeLeft((waitTime - Math.round(Date.now() / 1000)) <= 0 ? 0 : waitTime - Math.round(Date.now() / 1000))
    }, 1000)

    setIsAllowed(waitTime <= Math.round(Date.now() / 1000))

    return () => clearInterval(myInterval)
  }, [attempts, lastAttemptDate, timeLeft])

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

  const handleSubmit = () => {
    const input = document.getElementById('password-recover-input') as HTMLInputElement
    if (!input.value) return
    if (isAllowed) {
      console.log('email sent')
      setAttemptsData(attempts, 'password')
      sendPasswordResetEmail(auth, input.value)
    }
    else {
      console.log('email not sent')
      return
    }
  }

  return (
    <Wrapper className='flex-all-center'>
      {isLoading && <Spinner darkBackground={false} displayOnFirstLoad={true} />}
      <ContentWrapper className='styled-page-box flex-all-center'>
        <h1>Password Reset</h1>
        <span onClick={handleClick}>Enter with your email:</span>
        <InputWrapper>
          <input type='text' id='password-recover-input' onKeyDown={(e) => handleKeyDown(e)} />
          <i className='bi bi-x' onClick={clearText}></i>
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

const InputWrapper = styled.div`
  display: flex;
  background-color: #fff;
  width: 250px;
  margin-top: -10px;
  padding: 2px;

  & .bi-x {
    font-size: 25px;
    color: var(--color-primary);
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`
