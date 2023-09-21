import styled from 'styled-components'
import { useContext } from 'react'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../contexts/SaveConfigContext'

export const VolumeBar = () => {
  const {
    customizationDispatch,
    customizationState: { volume },
  } = useContext(CustomizationContext) as CustomizationContextType

  const { setIsSaved } = useContext(SaveConfigContext) as SaveConfigContextType

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    customizationDispatch({ type: 'CHANGE_VOLUME', payload: e.target.value })
    setIsSaved(false)
  }

  return (
    <Wrapper>
      <label htmlFor='volume'>Volume:</label>
      <input
        type='range'
        id='volume'
        value={volume}
        min='0'
        max='1'
        step='0.01'
        onChange={(e) => handleChange(e)}
      />
    </Wrapper>
  )
} 

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
