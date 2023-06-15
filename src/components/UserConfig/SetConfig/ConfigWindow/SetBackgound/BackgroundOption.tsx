import styled from 'styled-components'
import { StylesContext, StylesContextType } from '../../../../../contexts/StylesContext'
import { useContext } from 'react'
import { breakpoints } from '../../../../../utilities/breakpoints'

interface Props {
  background: string
}

export const BackgroundOption = ({ background }: Props) => {
  const { stylesDispatch } = useContext(StylesContext) as StylesContextType

  let title = background.split('/').slice(-1).join('').split('.')[0].replaceAll('-', ' ')
  title = title.charAt(0).toUpperCase() + title.slice(1)

  const handleClick = () => {
    stylesDispatch({ type: 'CHANGE_BACKGROUND', payload: background })
  }

  return (
    <Wrapper onClick={handleClick}>
      <BackgroundTitle>{title}</BackgroundTitle>
      <img
        className='img-full-cover'
        src={background}
        alt='background-option'
      />
    </Wrapper>
  )
}

const BackgroundTitle = styled.p`
  width: 100%;
  padding: 7px;
  background-color: var(--color-primary);
  border-radius: 10px 10px 0 0;
  text-align: center;
`

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  &, & img {
    border-radius: 0 0 10px 10px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 120px;
    max-height: 120px;
  }
`
