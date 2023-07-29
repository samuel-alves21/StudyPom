import styled from 'styled-components'
import { useRef, useEffect, useMemo, useContext, useState } from 'react'
import { FormContext, FormContextType } from '../../../contexts/FormContext'
import { FormInput } from './FormInput'
import { Text } from './Text'
import { formValidation } from '../../../functions/formValidation'
import { breakpoints } from '../../../utilities/breakpoints'
import { Logo } from '../../Logo'

export type FormInputType = 'email' | 'password' | 'confirmedPassword' | 'username'

export const Form = () => {
  const { formState, formDispatch } = useContext(FormContext) as FormContextType
  
  const hasError =
    formState.email.hasError ||
    formState.password.hasError ||
    formState.username.hasError ||
    formState.confirmedPassword.hasError

  const [shouldSend, setShouldSend] = useState(false)

  const inputsArray: HTMLInputElement[] = useMemo(() => [], [])

  const formWrapper = useRef<null | HTMLFormElement>(null)

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
            setShouldSend(false)
          } else {
            setShouldSend(true)
          }
        }
      })
    }
  }

  useEffect(() => {
    const form = formWrapper.current as HTMLFormElement
    form.childNodes.forEach((child) => {
      child.childNodes.forEach((child2) => {
        const element = child2 as HTMLInputElement
        if (element.placeholder) {
          inputsArray.push(element as HTMLInputElement)
        }
      })
    })
  }, [inputsArray])

  useEffect(() => {
    window.addEventListener('mouseover', (e: MouseEvent) => {
      const thisElement = e.target as HTMLButtonElement
      if (thisElement.type === 'submit') {
        setShouldSend(true)
      }
    })
    return () =>
      window.removeEventListener('click', (e: MouseEvent) => {
        const thisElement = e.target as HTMLButtonElement
        if (thisElement.type === 'submit') {
          setShouldSend(true)
        }
      })
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!shouldSend) return
    let isEmpty = false
    inputsArray.forEach((input) => {
      if (!input.value) {
        formValidation.EmptyVerify(input.value, formDispatch, input.id as FormInputType)
        isEmpty = true
      }
    })
    if (!hasError && !isEmpty) {
      console.log('form sent')
      return
    }
    console.log('form not sent')
  }

  const props = {
    handleKeyDown: handleKeyDown,
  }

  return (
    <Wrapper>
      <TextWrapper>
        <Logo />
        <Text />
      </TextWrapper>
      <FormWrapper ref={formWrapper} action='' onSubmit={(e) => handleSubmit(e)}>
        <h2>Create your account</h2>
        <FormInput {...props} id='username' placeholder='username' type='text' />
        <FormInput {...props} id='email' placeholder='email' type='email' />
        <FormInput {...props} id='password' placeholder='password' type='password' />
        <FormInput {...props} id='confirmedPassword' placeholder='confirm password' type='password' />
        <button type='submit' className='form-button'>
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
    justify-content: space-between;

    & > div {
      position: initial;
    }
  }
`

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-1);

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
