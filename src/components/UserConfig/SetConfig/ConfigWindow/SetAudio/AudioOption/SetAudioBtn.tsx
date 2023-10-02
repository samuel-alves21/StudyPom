import styled from 'styled-components'
import { useContext } from 'react'
import { StyledButton } from '../../../../../Timer/Counter/CounterOptionsBtn/OptionsBtn'
import { SoundObject } from '../../../../../../contexts/CustomizationContext'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../../contexts/SaveConfigContext'

interface SetAudioBtnProps {
  sounds: SoundObject
}

interface StyledSoundButtonProps {
  isSelected: boolean
}

export const SetAudioBtn = ({ sounds: { start, end, name } }: SetAudioBtnProps) => {
  const {
    saveConfigDispatch,
    SaveConfigState: { stagedSound },
  } = useContext(SaveConfigContext) as SaveConfigContextType

  const isSelected = name === stagedSound.name

  const handleClick = () => {
    // customizationDispatch({ type: 'CHANGE_SOUND', payload: { start, end, name } })
    saveConfigDispatch({ type: 'STAGE_SOUND', payload: { start, end, name } })
    saveConfigDispatch({ type: 'SET_IS_SAVED', payload: false })
  }

  return (
    <Button isSelected={isSelected} onClick={() => handleClick()}>
      set sound
    </Button>
  )
}

const Button = styled(StyledButton)`
  padding: 0.6rem;
  font-size: 1.25rem;
  display: block;
  margin: 0 auto;
  background-color: ${({ isSelected }: StyledSoundButtonProps) => (isSelected ? 'white' : 'transparent')};
  color: ${({ isSelected }: StyledSoundButtonProps) => (isSelected ? 'black' : 'white')};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: white;
      color: #1d1d1d;
    }
  }
`
