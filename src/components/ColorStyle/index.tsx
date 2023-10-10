import { createGlobalStyle } from 'styled-components'

interface ColorStyleProps {
  colors: {
    mainColor: string
  }
}

export const ColorStyle = createGlobalStyle<ColorStyleProps>`
  :root {
    --color-primary: ${(props) => props.colors.mainColor};
    --color-primary-light: ${(props) => props.colors.mainColor}61;
  }

  ::selection {
    background: var(--color-primary);
    color: #fff;
  }
`
