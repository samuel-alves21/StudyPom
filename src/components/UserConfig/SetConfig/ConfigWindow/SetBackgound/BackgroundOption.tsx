import styled from 'styled-components'
import { StylesContext, StylesContextType } from '../../../../../contexts/StylesContext'
import { useContext } from 'react'

interface Props {
  background: string
}

export const BackgroundOption = ({ background }: Props) => {
  const { stylesDispatch } = useContext(StylesContext) as StylesContextType

  const handleClick = () => {
    stylesDispatch({ type: 'CHANGE_BACKGROUND', payload: background })
  }

  return (
    <Wrapper onClick={handleClick}>
      <img
        className='img-full-cover'
        src={background}
        alt='background-option'
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 200px;
  max-height: 200px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`
