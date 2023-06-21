import styled from 'styled-components'
import { useContext } from 'react'
import { ButtonContextType, ButtonsContext } from '../../../../contexts/ButtonsContext'
import { TimerContext, TimerContextType } from '../../../../contexts/TimerContext'
import { breakpoints } from '../../../../utilities/breakpoints'
import { Id } from '../../../../types/types'
import { TimerActionTypes } from '../../../../contexts/TimerContext/types'
import { ButtonsActionTypes } from '../../../../contexts/ButtonsContext/types'

interface Props {
  text: Id
}

interface StyledProps {
  isSelected: boolean
}

export const OptionsBtn = ({ text }: Props) => {
  const { timeDispatch } = useContext(TimerContext) as TimerContextType

  const { buttonState, buttonDispatch } = useContext(
    ButtonsContext
  ) as ButtonContextType

  const handleClick = (text: string) => {
    timeDispatch({ type: `SET_${text.toUpperCase()}_TIME` as TimerActionTypes })

    timeDispatch({ type: 'SET_TIME_COUNTING', payload: false })

    buttonDispatch({
      type: text.toUpperCase() as ButtonsActionTypes,
    })
  }

  return (
    <StyledButton
      onClick={() => handleClick(text)}
      isSelected={buttonState[text.toLowerCase()]}
    >
      {text.replace(text[0], text[0].toUpperCase())}
    </StyledButton>
  )
}

export const StyledButton = styled.button`
  padding: 10px 40px;
  border: white solid 1px;
  border-radius: 20px;
  background-color: ${({ isSelected }: StyledProps) =>
    isSelected ? 'white' : 'transparent'};
  color: ${({ isSelected }: StyledProps) => (isSelected ? 'black' : 'white')};
  cursor: pointer;
  transition: background-color 5s;
  transition: color 0.5s;
  font-weight: 600;
  &:hover {
    background-color: white;
    color: black;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 20px;
    font-size: 12px;
  }
`
