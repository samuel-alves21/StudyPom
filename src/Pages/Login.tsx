import { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { LoginContent } from '../components/LoginContent'
import { breakpoints } from '../utilities/breakpoints'
import { Spinner } from '../components/Spinner'
import { GlassBox } from '../components/GlassBox'
import { LoginContext, LoginContextType } from '../contexts/LoginContext'
import { Unsubscribe, onValue, ref } from 'firebase/database'
import { getIp } from '../functions/getIp'
import { database } from '../firebase/config'
import { AccessContext, AccessContextType } from '../contexts/AccessContext'

export const Login = () => {
  const { setIsLogin } = useContext(LoginContext) as LoginContextType
  const { accessDispatch } = useContext(AccessContext) as AccessContextType

  window.document.title = 'StudyPom | Login'

  useEffect(() => {
    setIsLogin(true)
  }, [setIsLogin])

  useEffect(() => {
    let unsubscribe: Unsubscribe
    const asyncFn = async () => {
      const ip = await getIp()
      unsubscribe = onValue(ref(database, `ips/${ip}`), (snapshot) => {
        if (snapshot.exists()) {
          const accessvalues = snapshot.val()
          console.log(accessvalues)
          accessDispatch({ type: 'INCREMENT_ATTEMPTS', payload: accessvalues.attempts })
          accessDispatch({ type: 'SET_DATE', payload: accessvalues.date })
        }
      })
    }
    asyncFn()
    return () => unsubscribe && unsubscribe()
  }, [accessDispatch])

  return (
    <Bg>
      <Spinner darkBackground={true} displayOnFirstLoad={false} />
      <Wrapper className='main-container flex-all-center'>
        <GlassBox>
          <LoginContent />
        </GlassBox>
      </Wrapper>
    </Bg>
  )
}

const Bg = styled.div`
  background: radial-gradient(circle, rgba(214, 78, 219, 1) 21%, rgba(176, 50, 233, 1) 97%);
`

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 30px;
  min-height: 100vh;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`
