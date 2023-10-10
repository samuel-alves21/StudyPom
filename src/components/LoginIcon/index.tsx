import { useContext } from 'react'
import { UserContext, UserContextType } from '../../contexts/UserContext'
import styled from 'styled-components'
import { auth } from '../../firebase/config'
import { breakpoints } from '../../utilities/breakpoints'

export const LoginIcon = () => {
  const {
    userState: { pendentUser },
  } = useContext(UserContext) as UserContextType

  return (
    <Wrapper>
      {pendentUser ? (
        <h3 onClick={() => (window.location.href = '/StudyPom/register')}>Sign Up</h3>
      ) : (
        <i className='bi bi-box-arrow-right' onClick={() => auth.signOut()}></i>
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
    font-size: 3.5rem;
    transition: transform 0.2s ease-in-out;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: var(--color-primary);
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    position: initial;
    bottom: 0;
  }

  @media (max-height: 650px) and (min-width: ${breakpoints.laptop}) {
    position: initial;
    bottom: 0;
  }
`
