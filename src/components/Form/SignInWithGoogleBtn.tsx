import styled from 'styled-components'
import googleLogo from '../../img/google-logo.png'
import { signInWithPopup, updateProfile } from 'firebase/auth'
import { auth, database, provider } from '../../firebase/config'
import { get, ref, set } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

export const SignInWithGoogleBtn = () => {
  const navigate = useNavigate()

  const handleClick = async () => {
    const spinner = document.querySelector('.spinner') as HTMLDivElement
    spinner.style.display = 'flex'
    try {
      const result = await signInWithPopup(auth, provider)
      const snapshot = await get(ref(database, `users/${result.user.uid}`))
      if (snapshot.exists()) {
        const username = (await get(ref(database, `users/${result.user.uid}/username`))).val()
        await updateProfile(result.user, {
          displayName: username,
        })
        await set(ref(database, 'users/' + result.user.uid), {
          username: username,
          email: result.user.email,
          id: result.user.uid,
        })
        await set(ref(database, 'username/' + result.user.uid), {
          username: username,
        })
      } else {
        await set(ref(database, 'users/' + result.user.uid), {
          username: result.user.displayName,
          email: result.user.email,
          id: result.user.uid,
        })
        await set(ref(database, 'username/' + result.user.uid), {
          username: result.user.displayName,
        })
      }
      spinner.style.display = 'none'
      navigate('/StudyPom')
    } catch (error) {
      console.error(error)
    }
    spinner.style.display = 'none'
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
