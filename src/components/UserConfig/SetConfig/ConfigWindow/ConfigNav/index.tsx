import { useContext } from 'react'
import styled from 'styled-components'
import { UserContext, UserContextType } from '../../../../../contexts/UserContext'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../contexts/SaveConfigContext'

interface ConfigNavProps {
  setOption: (option: 'timer' | 'background' | 'sounds' | 'color') => void
  option: 'timer' | 'background' | 'sounds' | 'color'
  setShouldDisplay: (shouldDisplay: boolean) => void
}

export interface ConfigNavStyledProps {
  isSelected: boolean
}

export const ConfigNav = ({ setOption, option, setShouldDisplay }: ConfigNavProps) => {
  const { userState } = useContext(UserContext) as UserContextType
  const { SaveConfigState, saveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType

  const handleClick = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    setOption(e.currentTarget.innerText.toLowerCase() as typeof option)
  }

  const handleCloseWindow = () => {
    if (!SaveConfigState.isSaved && !userState.pendentUser) {
      saveConfigDispatch({ type: 'SET_NOT_SAVED_ALERT' })
      return
    }

    setShouldDisplay(false)
  }

  return (
    <Wrapper>
      <Options>
        <Option onClick={(e) => handleClick(e)} isSelected={'timer' === option}>
          Timer
        </Option>
        <Option onClick={(e) => handleClick(e)} isSelected={'sounds' === option}>
          Sounds
        </Option>
        <Option onClick={(e) => handleClick(e)} isSelected={'color' === option}>
          Color
        </Option>
        <Option onClick={(e) => handleClick(e)} isSelected={'background' === option}>
          Background
        </Option>
      </Options>
      <i className='bi bi-x-lg' onClick={handleCloseWindow}></i>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-primary);
  border-radius: 10px 10px 0 0;
  padding: 1rem;
  width: 100%;

  & .bi-x-lg {
    font-size: 1.75rem;
    color: white;
  }

  @media (hover: hover) and (pointer: fine) {
    & .bi-x-lg:hover {
      cursor: pointer;
      transform: scale(1.2);
      color: #ffffff8f;
    }
  }
`

const Options = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
`

const Option = styled.p<ConfigNavStyledProps>`
  position: relative;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      color: #ffffff8f;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    height: 1.7px;
    width: 100%;
    background-color: white;
    animation: slide 0.3s ease-in-out forwards;
    opacity: ${(props) => (props.isSelected ? 1 : 0)};
  }
`
