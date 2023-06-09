import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    animation: {}
  }

  ::selection {
    background: var(--color-primary);
    color: #fff;
  }
  
  :root {
    font-size: 62.5%;
    font-family: 'Roboto', sans-serif;
    color: #fff;   
    
    --color-primary: #ae83ff;
  }

  .img-full-cover {
    object-fit: cover;
    width: 100%;
  }

  h1, h2, h3, h4 {
    text-align: center;
  }

  h1 {
    font-size: calc(3.3rem + 0.2vw);
  }

  p, span {
    font-size: calc(1.4rem + 0.2vw);
  }

  label {
    font-size: calc(1.8rem);
  }

  span {
    font-weight: bold;
  }

  input {
    outline: none;
    border: none;
    font-size: 1.3rem;
    padding: 0 0.5rem;
    font-family: 'montserrat', sans-serif;
  }

  button {
    outline: none;
    border: none;
  }
`
