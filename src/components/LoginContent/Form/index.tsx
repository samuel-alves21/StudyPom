import { useRef, useState } from 'react'
import styled from 'styled-components'
import { FormButton } from './FormButton'

export const Form = () => {
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false)

  let shouldSendForm = false

  const userNameInput = useRef<HTMLInputElement | null>(null)
  const emailInput = useRef<HTMLInputElement | null>(null)
  const passwordInput = useRef<HTMLInputElement | null>(null)

  const InputArray = [userNameInput, emailInput, passwordInput]

  const IconHandleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const thisElement = e.target as HTMLElement
    const nextElement = thisElement.nextElementSibling as HTMLElement
    nextElement.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      InputArray.forEach((input, index) => {
        if (input.current === e.target) {
          if (InputArray[index + 1]) {
            InputArray[index + 1].current?.focus()
          } else {
            shouldSendForm = true
          }
        }
      })
    }
  }

  return (
    <FormWrapper action=''>
      <h1>Boost Your Productivity!</h1>
      <p>
        Maximize your <strong>productivity</strong> with our <strong>Pomodoro</strong> app. Focus{' '}
        <strong>better</strong>, work <strong>smarter</strong>, and achieve <strong>more</strong>. Sign in to start now!
      </p>
      <h2>Create your account</h2>
      <InputFieldWrapper>
        <i className='bi bi-person-circle' onClick={(e) => IconHandleClick(e)}></i>
        <input
          type='text'
          placeholder='username'
          ref={userNameInput}
          onKeyDown={(e) => handleKeyDown(e)}
          autoComplete='off'
        />
      </InputFieldWrapper>
      <InputFieldWrapper>
        <i className='bi bi-envelope-fill' onClick={(e) => IconHandleClick(e)}></i>
        <input
          type='email'
          placeholder='email'
          ref={emailInput}
          onKeyDown={(e) => handleKeyDown(e)}
          autoComplete='off'
        />
      </InputFieldWrapper>
      <InputFieldWrapper>
        <i className='bi bi-key-fill' onClick={(e) => IconHandleClick(e)}></i>
        <input
          type={shouldShowPassword ? 'text' : 'password'}
          placeholder='password'
          ref={passwordInput}
          onKeyDown={(e) => handleKeyDown(e)}
          autoComplete='off'
        />
        {shouldShowPassword ? (
          <i className='bi bi-eye-fill' onClick={() => setShouldShowPassword(false)}></i>
        ) : (
          <i className='bi bi-eye-slash-fill' onClick={() => setShouldShowPassword(true)}></i>
        )}
      </InputFieldWrapper>
      <FormButton shouldSendForm={shouldSendForm} />
      <p>
        Already have an account? <a href='#'>Sign in</a>
      </p>
    </FormWrapper>
  )
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 550px;

  & > p {
    margin-bottom: 10px;
    line-height: 25px;
  }
`

const InputFieldWrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  color: white;
  border: 0.5px solid white;

  & > .bi {
    font-size: 25px;
    cursor: pointer;
  }

  & input {
    width: 100%;
    background-color: transparent;
    margin: 0 10px;
    color: #fff;
    font-size: 16px;
  }
`
