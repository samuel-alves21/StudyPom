import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { FormContext, FormContextType } from '../../contexts/FormContext'
import { FormInput } from './FormInput'
import { Text } from './Text'
import { breakpoints } from '../../utilities/breakpoints'
import { Logo } from '../Logo'
import { useFormInputs } from '../../hooks/useFormInputs'
import { formSubmit } from '../../functions/formSubmit'
import { hasErrorOnSubmit } from '../../functions/formValidation'
import { LoginContext, LoginContextType } from '../../contexts/LoginContext'
import { UserContext, UserContextType } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

interface TextWrapperProps {
  isLogin: boolean
}

interface LoginWrapper {
  isLogin: boolean
}

export type FormInputType = 'email' | 'password' | 'confirmedPassword' | 'username'

export const Form = () => {
  const { formState, formDispatch } = useContext(FormContext) as FormContextType
  const { isLogin, setIsLogin } = useContext(LoginContext) as LoginContextType
  const { setUser, user } = useContext(UserContext) as UserContextType

  const [ loginError, setLoginError ] = useState(false)

  const navigate = useNavigate()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const thisElement = e.target as HTMLInputElement
    const type = thisElement.id as FormInputType

    if (e.key === 'Tab') {
      e.preventDefault()
    }

    if (formState[type].hasError) return

    if (e.key === 'Enter') {
      inputsArray.forEach((input, index) => {
        if (input === e.target) {
          if (inputsArray[index + 1]) {
            inputsArray[index + 1].focus()
          } else {
            formSubmit(hasErrorOnSubmit(formState), inputsArray, formDispatch, isLogin, navigate, user, setUser, setLoginError)
          }
        }
      })
    }
  }

  useEffect(() => {
    console.log(isLogin)
    console.log(loginError)
  }, [loginError, isLogin])

  const inputsArray = useFormInputs('form')

  const props = {
    handleKeyDown: handleKeyDown,
  }

  const handleClick = () => {
    formSubmit(hasErrorOnSubmit(formState), inputsArray, formDispatch, isLogin, navigate, user, setUser, setLoginError)
  }

  const handleGoWithoutAccount = () => {
    setUser({ ...user, isLogedIn: 'pending' })
    navigate('/')
  }

  return (
    <Wrapper isLogin={isLogin}>
      <TextWrapper isLogin={isLogin}>
        <Logo />
        {isLogin || <Text />}
      </TextWrapper>
      <FormWrapper id='form'>
        <h2>{isLogin ? 'Access your account' : 'Create your account'}</h2>
        {isLogin || <FormInput {...props} id='username' placeholder='username' type='text' />}
        <FormInput {...props} id='email' placeholder='email' type='email' />
        <FormInput {...props} id='password' placeholder='password' type='password' />
        {(isLogin && loginError) && <p id='login-error'>Invalid email or password</p>}
        {isLogin || <FormInput {...props} id='confirmedPassword' placeholder='confirm password' type='password' />}
        <button className='form-button' onClick={handleClick}>
          {isLogin ? 'Access account' : 'Create account'}
        </button>
        <p>
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
          &nbsp;
          <span className='navigation-span' onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>
        {isLogin || (
          <div className='arrow-div'>
            <p>
              or{' '}
              <span className='navigation-span' onClick={handleGoWithoutAccount}>
                continue without account
              </span>
            </p>
            <i className='bi bi-arrow-right'></i>
          </div>
        )}
      </FormWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div<LoginWrapper>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 550px;
  gap: var(--gap-1);

  ${({ isLogin }) => {
    if (!isLogin) {
      return `
        @media (max-height: 650px) and (min-width: ${breakpoints.laptop}) {
        flex-direction: row;
        justify-content: space-evenly;
        flex-grow: 1; 
        max-width: none;
        }
      `
    } else {
      return `
        height: 100%;
        justify-content: center;
        gap: 100px;
      `
    }
  }}

  .arrow-div {
    gap: 10px;
    position: relative;
  }

  .bi-arrow-right {
    font-size: 18px;
    color: var(--color-primary);
    position: absolute;
    bottom: -2px;
    right: -25px;
    transition: translate 0.03s ease-in-out;
  }

  #login-error {
    color: var(--color-error);
  }
`

const TextWrapper = styled.div<TextWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-1);

  #logo {
    position: ${({ isLogin }) => (isLogin ? 'initial' : 'absolute')};

    @media (max-width: ${breakpoints.laptop}) {
      position: initial;
    }
  }

  @media (max-height: 650px) and (min-width: ${breakpoints.laptop}) {
    max-width: 300px;
    justify-content: space-around;
    flex-direction: column-reverse;

    #logo {
      position: initial;
    }
  }
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-1);

  & > h2 {
    color: var(--color-primary);
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 25px;
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    gap: var(--gap-1);
  }

  @media (max-height: 650px) and (min-width: ${breakpoints.laptop}) {
    width: 350px;
  }
`
