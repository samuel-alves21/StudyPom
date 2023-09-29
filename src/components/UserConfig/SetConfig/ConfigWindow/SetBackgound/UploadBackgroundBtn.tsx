import styled from "styled-components"

export const UploadBackgroundBtn = () => {
  return <Button className="form-button">upload background</Button>
}

const Button = styled.button`
  width: 180px;
  margin: 20px auto 0px;

  @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: #fff;
      }
    }
`