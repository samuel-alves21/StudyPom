import styled from 'styled-components'
import { useContext } from 'react'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'

export const VolumeBar = () => {
  const {
    customizationDispatch,
    customizationState: { volume },
  } = useContext(CustomizationContext) as CustomizationContextType

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
        onChange={(e) => customizationDispatch({ type: 'CHANGE_VOLUME', payload: e.target.value })}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
