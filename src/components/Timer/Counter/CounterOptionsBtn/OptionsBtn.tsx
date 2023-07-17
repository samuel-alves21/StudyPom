import styled from 'styled-components'
import { useContext } from 'react'
import { ButtonContextType, ButtonsContext } from '../../../../contexts/ButtonsContext'
import { TimerContext, TimerContextType } from '../../../../contexts/TimerContext'
import { breakpoints } from '../../../../utilities/breakpoints'
import { OptionsBtnProps, StyledButtonProps } from '../../../../types/types'
import { TimerActionTypes } from '../../../../contexts/TimerContext/types'
import { ButtonsActionTypes } from '../../../../contexts/ButtonsContext/types'

export const OptionsBtn = ({ text }: OptionsBtnProps) => {
  const { timeDispatch } = useContext(TimerContext) as TimerContextType

  const { buttonState, buttonDispatch } = useContext(ButtonsContext) as ButtonContextType

  const handleClick = (text: string) => {
    timeDispatch({ type: `SET_${text.toUpperCase()}_TIME` as TimerActionTypes })

    timeDispatch({ type: 'SET_TIME_COUNTING', payload: false })

    buttonDispatch({
      type: text.toUpperCase() as ButtonsActionTypes,
    })
  }

  return (
    <StyledButton
      className='options-btn'
      onClick={() => handleClick(text)}
      isSelected={buttonState[text.toLowerCase()]}
    >
      {text.replace(text[0], text[0].toUpperCase())}
    </StyledButton>
  )
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ isSelected }) => (isSelected ? 'white' : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? 'black' : 'white')};
  &:hover {
    background-color: white;
    color: #1d1d1d;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 20px;
    font-size: 12px;
  }
`
