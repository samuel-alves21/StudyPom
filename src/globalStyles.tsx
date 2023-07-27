import { createGlobalStyle } from 'styled-components'
import { breakpoints } from './utilities/breakpoints'

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
    --color-error: #ff3939;
    --color-primary: #cc66fc;
  }

  body {
    min-height: 100vh;
  }

  .img-full-cover {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .main-container {
    width: 100%;
    max-width: 2000px
  }

  h1, h2, h3, h4 {
    text-align: center;
  }

  h1 {
    font-size: calc(3.2rem + 0.2vw);
  }

  h2 {
    font-size: calc(2.3rem + 0.2vw);
  }

  h3 {
    font-size: calc(1.6rem + 0.2vw);
  }

  p, span {
    font-size: calc(1.4rem + 0.2vw);
  }

  label {
    font-size: calc(1.6rem);
  }

  span {
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: #b032e9;
  }

  a:hover {
    text-decoration: underline;
  }

  input {
    outline: none;
    border: none;
    font-size: 1.3rem;
    padding: 0 0.5rem;
    font-family: 'montserrat', sans-serif;
  }

  .form-input {
    @media (max-width: ${breakpoints.mobile}) {
      width: 80%;
    }
  }

  button {
    outline: none;
    border: none;
    padding: 10px 40px;
    border: white solid 1px;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 5s;
    transition: color 0.5s;
    font-weight: 500;
  }

  .form-input {
    width: 100%;
    background-color: transparent;
    margin: 0 10px;
    color: #fff;
    font-size: 16px;
  }

  .form-button {
    width: 70%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    transition: all 0.2s ease;
    font-size: 14px;
    color: #3b3b3b;
    cursor: pointer;

    &:hover {
      background-color: #af32e9;
      color: #fff;
    }

    @media (max-width: ${breakpoints.mobile}) {
      width: 80%;
    }
  }

  input[type="range"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    height: 7px;
    background-color: var(--color-primary);
    border-radius: 5px;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    background-color: #fff;
    border: none;
    border-radius: 50%;
    margin-top: -3.5px; 
  }

  input[type="range"]::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background-color: #fff;
    border: none;
    border-radius: 50%;
    margin-top: -3.5px; 

  }

  input[type="range"]::-ms-thumb {
    width: 15px;
    height: 15px;
    background-color: #fff;
    border: none;
    border-radius: 50%;
    margin-top: -3.5px; 
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 7px;
    background-color: var(--color-primary);
    border-radius: 5px;
  }

  input[type="range"]::-moz-range-track {
    height: 7px;
    background-color: var(--color-primary);
    border-radius: 5px;
  }

  input[type="range"]::-ms-track {
    height: 7px;
    background-color: var(--color-primary);
    border-radius: 5px;
  }
`
