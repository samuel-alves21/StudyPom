import styled from 'styled-components'
import { backgroundArray } from '../../../../../utilities/backgroundArray'
import { BackgroundOption } from './BackgroundOption'
import { breakpoints } from '../../../../../utilities/breakpoints'
import { useContext } from 'react'
import { StylesContext, StylesContextType } from '../../../../../contexts/StylesContext'

export const SetBackground = () => {
  const { stylesState: { blur }, stylesDispatch } = useContext(StylesContext) as StylesContextType

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    stylesDispatch({type: 'CHANGE_BLUR', payload: e.target.value})
  }

  return (
    <Wrapper>
      <RangeInputWrapper>
        <label htmlFor="blur">Blur</label>
        <input type="range" name="" id="blur" min={0} max={3} step={0.1} value={blur} onChange={(e) => handleChange(e)}/>
        <span>{Number(blur).toFixed(1)}</span>
      </RangeInputWrapper>
      <BackgroundsWrapper>
        {backgroundArray.map((background, index) => {
          return <BackgroundOption background={background} key={index} />
        })}
      </BackgroundsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const RangeInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  & > input {
    width: 40%;
    cursor: pointer;
    margin: 0 10px;
  }
`

const BackgroundsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 50px;
  }
`