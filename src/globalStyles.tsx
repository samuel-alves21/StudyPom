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

    --gap-1: 20px;
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
    position: relative;
  }

  .flex-all-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .styled-page-box {
    background: rgba(17, 17, 17, 0.65);
    box-shadow: 0 8px 32px 0 rgba(165, 34, 128, 0.37);
    backdrop-filter: blur(3.5px);
    -webkit-backdrop-filter: blur(3.5px);

    border-radius: 20px;
    padding: 30px;
  }

  .error {
    color: var( --color-error);
  }

  .navigation-span {
    text-decoration: none;
    color: var( --color-primary);
    font-weight: normal;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .form-input {
    width: 100%;
    background-color: transparent;
    margin: 0 10px;
    color: #fff;
    font-size: 16px;

    @media (max-width: ${breakpoints.mobile}) {
      width: 80%;
    }
  }

  .form-button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    transition: color 0.2s ease;
    transition: background-color 0.2s ease;
    font-size: 14px;
    color: #3b3b3b;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var( --color-primary);
        color: #3b3b3b;
      }
    }

    @media (max-width: ${breakpoints.mobile}) {
      width: 80%;
    }
  }

  .form-button-disabled {
    opacity: 0.5;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        opacity: 0.5;
        background-color: #fff;
        color: #000;
        cursor: not-allowed;
      }
    }
  }

  .disabled {
    cursor: not-allowed;
  }

  .flex-column {
    flex-direction: column;
  }

  h1, h2, h3, h4 {
    text-align: center;
  }

  h1 {
    font-size: calc(3.0rem + 0.2vw);
  }

  h2 {
    font-size: calc(2.1rem + 0.2vw);
  }

  h3 {
    font-size: calc(1.4rem + 0.2vw);
  }

  p, span {
    font-size: calc(1.4rem + 0.2vw);
  }

  label {
    font-size: calc(1.6rem);
    cursor: pointer;
  }

  span {
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: var( --color-primary);
  }

  @media (hover: hover) and (pointer: fine) {
    a:hover {
      text-decoration: underline;
    }
  }

  input {
    outline: none;
    border: none;
    font-size: 1.3rem;
    padding: 0 0.5rem;
    font-family: 'montserrat', sans-serif;
  }

  input[type="text"]:disabled {
    cursor: not-allowed;
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

  @media (max-width: ${breakpoints.mobile}) {
    h1 {
      font-size: calc(2.5rem + 0.2vw);
    }
  }
`
