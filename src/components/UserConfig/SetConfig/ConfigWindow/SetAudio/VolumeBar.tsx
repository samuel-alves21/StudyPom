import styled from 'styled-components'
import { useContext } from 'react'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../contexts/SaveConfigContext'

export const VolumeBar = () => {
  const {
    saveConfigDispatch,
    SaveConfigState: { stagedVolume },
  } = useContext(SaveConfigContext) as SaveConfigContextType

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    saveConfigDispatch({ type: 'SET_IS_SAVED', payload: false })
    saveConfigDispatch({ type: 'STAGE_VOLUME', payload: e.target.value })
  }

  return (
    <Wrapper>
      <label htmlFor='volume'>Volume:</label>
      <input
        type='range'
        id='volume'
        value={stagedVolume}
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
