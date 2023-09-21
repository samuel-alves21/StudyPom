import styled from 'styled-components'
import { useContext } from 'react'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../contexts/SaveConfigContext'

export const RangeInputs = () => {
  const {
    customizationState: { blur, bright },
    customizationDispatch,
  } = useContext(CustomizationContext) as CustomizationContextType

  const { setIsSaved } = useContext(SaveConfigContext) as SaveConfigContextType


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'blur') {
      customizationDispatch({ type: 'CHANGE_BLUR', payload: e.target.value })
    } else {
      customizationDispatch({ type: 'CHANGE_BRIGHT', payload: e.target.value })
    }
    setIsSaved(false)
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
          value={blur}
          onChange={(e) => handleChange(e)}
        />
        <span>{Number(blur).toFixed(1)}</span>
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
          value={bright}
          onChange={(e) => handleChange(e)}
        />
        <span>{Number(bright).toFixed(2)}</span>
      </RangeInputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const RangeInputWrapper = styled.div`
  width: 100%;

  & > input[type='range'] {
    margin: 0 10px;
    width: 40%;
  }
`
