import { createGlobalStyle } from 'styled-components'

interface ColorStyleProps {
  colors: {
    mainColor: string
    secundaryColor: string
  }
}

export const ColorStyle = createGlobalStyle<ColorStyleProps>`
  :root {
    --color-primary: ${(props) => props.colors.mainColor};
    --color-primary-light: ${(props) => props.colors.secundaryColor};
  }

  ::selection {
    background: var(--color-primary);
    color: #fff;
  }
`
