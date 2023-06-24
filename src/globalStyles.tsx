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
  
  :root {
    font-size: 62.5%;
    font-family: 'Roboto', sans-serif;
    color: #fff;   
    
    --color-primary: #ae83ff;
    --color-primary-light: #ae83ff61;
  }

  ::selection {
    background: var(--color-primary);
    color: #fff;
  }


  .img-full-cover {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  h1, h2, h3, h4 {
    text-align: center;
  }

  h1 {
    font-size: calc(3.3rem + 0.2vw);
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
`
