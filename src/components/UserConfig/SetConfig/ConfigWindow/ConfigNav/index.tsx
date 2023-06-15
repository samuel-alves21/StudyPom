import styled from 'styled-components'
import { TimerContext } from '../../../../../contexts/TimerContext'
import { useContext } from 'react'



interface ConfigNavProps {
  setOption: (option: 'timer' | 'background' | 'sounds') => void
  option: 'timer' | 'background' | 'sounds'
  setShouldDisplay: (shouldDisplay: boolean) => void
}

interface StyledProps {
  isSelected: boolean
}

export const ConfigNav = ({ setOption, option, setShouldDisplay }: ConfigNavProps) => {
  const handleClick = ( e: React.MouseEvent<HTMLParagraphElement, MouseEvent> ) => {
    setOption(e.currentTarget.innerText.toLowerCase() as typeof option)
  }

  return (
    <Wrapper>
      <Options>
        <Option onClick={(e) => handleClick(e)} isSelected={'timer' === option}>
          Timer
        </Option>
        <Option
          onClick={(e) => handleClick(e)}
          isSelected={'sounds' === option}
        >
          Sounds
        </Option>
        <Option
          onClick={(e) => handleClick(e)}
          isSelected={'background' === option}
        >
          Background
        </Option>
      </Options>
      <i className='bi bi-x-lg' onClick={() => setShouldDisplay(false)}></i>
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

  & .bi-x-lg {
    font-size: 1.75rem;
    color: white;
  }

  & .bi-x-lg:hover {
    cursor: pointer;
    transform: scale(1.2);
    color: #ffffff8f;
  }
`

const Options = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
`

const Option = styled.p`
  position: relative;

  &:hover {
    cursor: pointer;
    color: #ffffff8f;
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
    opacity: ${(props: StyledProps) => (props.isSelected ? 1 : 0)};
  }
`
