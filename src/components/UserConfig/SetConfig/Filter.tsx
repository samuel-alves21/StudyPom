import styled from 'styled-components'

interface BackgroundFilterProps {
  shouldDisplay: boolean
}

export const Filter = styled.div<BackgroundFilterProps>`
  transition: opacity 0.2s ease-in-out;  opacity: 1;
  display: ${({ shouldDisplay }) => (shouldDisplay ? 'block' : 'none')};
  background-color: #0000006d;
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  z-index: 2;
  top: 0;
  left: 0;
`
