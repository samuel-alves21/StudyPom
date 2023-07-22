import styled from 'styled-components'

interface BackgroundFilterProps {
  shouldDisplay: boolean
}

export const Filter = styled.div<BackgroundFilterProps>`
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ shouldDisplay }) => (shouldDisplay ? '1' : '0')};
  background-color: #0000006d;
  position: absolute;
  min-width: 100%;
  min-height: 100vh;
  z-index: 2;
  top: 0;
  left: 0;
`
