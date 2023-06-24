import styled from 'styled-components'
import { useContext } from 'react'
import { StyledButton } from '../../../../../Timer/Counter/CounterOptionsBtn/OptionsBtn'
import { CustomizationContext, CustomizationContextType } from '../../../../../../contexts/CustomizationContext'

interface Props {
  sounds: {
    start: string
    end: string
  }
}

export const SetAudioBtn = ({ sounds: { start, end } }: Props) => {
  const { customizationDispatch } = useContext(CustomizationContext) as CustomizationContextType

  return (
    <Button onClick={() => customizationDispatch({ type: 'CHANGE_SOUND', payload: { start, end } })}>set sound</Button>
  )
}

const Button = styled(StyledButton)`
  padding: 0.6rem;
  font-size: 1.25rem;
  display: block;
  margin: 0 auto;
`
