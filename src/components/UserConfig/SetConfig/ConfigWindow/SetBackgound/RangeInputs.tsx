import { useContext } from 'react'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import styled from 'styled-components'

export const RangeInputs = () => {
  const {
    customizationState: { blur, bright },
    customizationDispatch,
  } = useContext(CustomizationContext) as CustomizationContextType

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'blur') {
      customizationDispatch({ type: 'CHANGE_BLUR', payload: e.target.value })
    } else {
      customizationDispatch({ type: 'CHANGE_BRIGHT', payload: e.target.value })
    }
  }

  return (
    <Wrapper>
      <RangeInputWrapper>
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
      <RangeInputWrapper>
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
  display: flex;
  justify-content: center;
  align-items: center;

  & > input[type='range'] {
    margin: 0 10px;
    width: 40%;
  }
`
