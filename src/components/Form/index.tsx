import styled from 'styled-components'
import { useContext } from 'react'
import { FormContext, FormContextType } from '../../contexts/FormContext'
import { FormInput } from './FormInput'
import { Text } from './Text'
import { breakpoints } from '../../utilities/breakpoints'
import { Logo } from '../Logo'
import { useFormInputs } from '../../hooks/useFormInputs'
import { formSubmit } from '../../functions/formSubmit'
import { hasErrorOnSubmit } from '../../functions/formValidation'
import { LoginContext, LoginContextType } from '../../contexts/LoginContext'

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
            formSubmit(hasErrorOnSubmit(formState), inputsArray, formDispatch, isLogin)
          }
        }
      })
    }
  }

  const inputsArray = useFormInputs('form')

  const props = {
    handleKeyDown: handleKeyDown,
  }

  const handleClick = () => {
    formSubmit(hasErrorOnSubmit(formState), inputsArray, formDispatch, isLogin)
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
        {isLogin || <FormInput {...props} id='confirmedPassword' placeholder='confirm password' type='password' />}
        <button className='form-button' onClick={handleClick}>
          {isLogin ? 'Access account' : 'Create account'}
        </button>
        <p>
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
          &nbsp;
          <a href='#' onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Login'}
          </a>
        </p>
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
