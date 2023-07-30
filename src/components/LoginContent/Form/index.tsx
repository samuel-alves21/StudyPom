import styled from 'styled-components'
import { useContext } from 'react'
import { FormContext, FormContextType } from '../../../contexts/FormContext'
import { FormInput } from './FormInput'
import { Text } from './Text'
import { breakpoints } from '../../../utilities/breakpoints'
import { Logo } from '../../Logo'
import { useFormInputs } from '../../../hooks/useFormInputs'
import { formSubmit } from '../../../functions/formSubmit'
import { hasErrorOnSubmit } from '../../../functions/formValidation'

export type FormInputType = 'email' | 'password' | 'confirmedPassword' | 'username'

export const Form = () => {
  const { formState, formDispatch } = useContext(FormContext) as FormContextType

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
            formSubmit(hasErrorOnSubmit(formState), inputsArray, formDispatch)
          }
        }
      })
    }
  }

  const inputsArray = useFormInputs('form')

  const props = {
    handleKeyDown: handleKeyDown,
  }

  return (
    <Wrapper>
      <TextWrapper>
        <Logo />
        <Text />
      </TextWrapper>
      <FormWrapper id='form'>
        <h2>Create your account</h2>
        <FormInput {...props} id='username' placeholder='username' type='text' />
        <FormInput {...props} id='email' placeholder='email' type='email' />
        <FormInput {...props} id='password' placeholder='password' type='password' />
        <FormInput {...props} id='confirmedPassword' placeholder='confirm password' type='password' />
        <button
          className='form-button'
          onClick={() => formSubmit(hasErrorOnSubmit(formState), inputsArray, formDispatch)}
        >
          Create account
        </button>
        <p>
          Already have an account? <a href='#'>Sign in</a>
        </p>
      </FormWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  gap: var(--gap-1);

  @media (max-height: 650px) and (min-width: ${breakpoints.laptop}) {
    flex-direction: row;
    justify-content: space-evenly;
    flex-grow: 1;
  }
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-1);

  @media (max-height: 650px) and (min-width: ${breakpoints.laptop}) {
    max-width: 300px;
    justify-content: space-around;
    min-height: 475px;
    flex-direction: column-reverse;

    & > div {
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
