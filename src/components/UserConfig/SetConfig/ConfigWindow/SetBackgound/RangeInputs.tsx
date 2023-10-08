import styled from 'styled-components'
import { useContext } from 'react'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../contexts/SaveConfigContext'

export const RangeInputs = () => {
  useContext(CustomizationContext) as CustomizationContextType

  const {
    saveConfigDispatch,
    SaveConfigState: { stagedBlur, stagedBright },
  } = useContext(SaveConfigContext) as SaveConfigContextType

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'blur') {
      saveConfigDispatch({ type: 'STAGE_BLUR', payload: e.target.value })
    } else {
      saveConfigDispatch({ type: 'STAGE_BRIGHT', payload: e.target.value })
    }
    saveConfigDispatch({ type: 'SET_IS_SAVED', payload: false })
  }

  return (
    <Wrapper>
      <RangeInputWrapper className='flex-all-center'>
        <label htmlFor='blur'>Blur</label>
        <input
          type='range'
          name=''
          id='blur'
          min={0}
          max={3}
          step={0.1}
          value={stagedBlur}
          onChange={(e) => handleChange(e)}
        />
        <span>{Number(stagedBlur).toFixed(1)}</span>
      </RangeInputWrapper>
      <RangeInputWrapper className='flex-all-center'>
        <label htmlFor='bright'>Bright</label>
        <input
          type='range'
          name=''
          id='bright'
          min={0}
          max={1}
          step={0.05}
          value={stagedBright}
          onChange={(e) => handleChange(e)}
        />
        <span>{Number(stagedBright).toFixed(2)}</span>
      </RangeInputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`

const RangeInputWrapper = styled.div`
  width: 100%;

  & > input[type='range'] {
    margin: 0 10px;
    width: 40%;
  }
`
