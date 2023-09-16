import { useContext } from 'react'
import { UserContext, UserContextType,  } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface SignInWithoutAccountBtnProps {
  inputsArray: HTMLInputElement[]
}

export const SignInWithoutAccountBtn = ({ inputsArray }: SignInWithoutAccountBtnProps) => {
  const { userDispatch } = useContext(UserContext) as UserContextType

  const navigate = useNavigate()

  const handleGoWithoutAccount = () => {
    inputsArray.forEach((input) => {
      input.value = ''
    })
    userDispatch({ type: 'SET_IS_PENDENT', payload: true })
    navigate('/StudyPom')
  }

  return (
    <Wrapper>
      <p>
        or{' '}
        <span className='navigation-span' onClick={handleGoWithoutAccount}>
          continue without account
        </span>
      </p>
      <i className='bi bi-arrow-right'></i>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;

  & .bi-arrow-right {
    font-size: 18px;
    color: var(--color-primary);
    position: absolute;
    bottom: -2px;
    right: -25px;
    transition: translate 0.03s ease-in-out;
  }
`
