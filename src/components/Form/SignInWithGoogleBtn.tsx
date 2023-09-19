import styled from 'styled-components'
import googleLogo from '../../img/google-logo.png'
import { getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { auth, provider } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { setUserLoggedWithGoogle } from '../../firebase/setUserLoggedWithGoogle'
import { useMediaQuery } from 'react-responsive'
import { breakpoints } from '../../utilities/breakpoints'

export const SignInWithGoogleBtn = () => {
  const navigate = useNavigate()

  const isTabletOrMobile = useMediaQuery({ query: `(max-width: ${breakpoints.tablet})` })

  useEffect(() => {
    if (!isTabletOrMobile) return
    const spinner = document.querySelector('.spinner') as HTMLDivElement
    spinner.style.display = 'flex'
    const asyncFn = async () => {
      try {
        const result = await getRedirectResult(auth)
        await setUserLoggedWithGoogle(result)
        spinner.style.display = 'none'
        if (result) navigate('/StudyPom')
      } catch (error) {
        console.error(error)
      }
      spinner.style.display = 'none'
    }
    asyncFn()
  }, [navigate, isTabletOrMobile])

  const handleClick = async () => {
    const spinner = document.querySelector('.spinner') as HTMLDivElement
    spinner.style.display = 'flex'
    try {
      if (!isTabletOrMobile) {
        const result = await signInWithPopup(auth, provider)
        await setUserLoggedWithGoogle(result)
        spinner.style.display = 'none'
        navigate('/StudyPom')
      } else {
        await signInWithRedirect(auth, provider)
      }
    } catch (error) {
      console.error(error)
    }
    // spinner.style.display = 'none'
  }

  return (
    <Wrapper>
      <button className='form-button' onClick={handleClick}>
        <img src={googleLogo} alt='google logo' />
        Or sign in with Google
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  & button {
    position: relative;
  }

  & img {
    position: absolute;
    left: 10px;
    top: 4px;
    width: 30px;
  }
`
