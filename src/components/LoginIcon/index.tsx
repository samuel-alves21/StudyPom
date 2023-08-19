import { useContext} from 'react'
import { UserContext, UserContextType } from '../../contexts/UserContext'
import styled from 'styled-components'
import { auth } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
export const LoginIcon = () => {
  const { user } = useContext(UserContext) as UserContextType

  const navigate = useNavigate()

  const handleClick = () => {
    auth.signOut()
    navigate('/login')
  }

  return (
    <Wrapper>
      {user.isLogedIn === 'pending' ? (
        <h3 onClick={() => navigate('/login')}>Sign Up</h3>
      ) : (
        <i className='bi bi-box-arrow-right' onClick={handleClick}></i>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;

  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  & .bi-box-arrow-right {
    font-size: 4rem;
    transition: transform 0.2s ease-in-out;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: var(--color-primary);
    }
  }
`
