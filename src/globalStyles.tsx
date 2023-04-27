import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :root {
    font-size: 62.5%;
    font-family: 'Roboto', sans-serif;
    color: #fff;    
  }

  .img-full-cover {
    object-fit: cover;
    width: 100%;
  }

  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3rem;
  }

  h4 {
    font-size: 2rem;
  }
`
