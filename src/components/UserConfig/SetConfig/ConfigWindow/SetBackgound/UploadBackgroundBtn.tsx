import { useState } from 'react'
import styled from 'styled-components'

export const UploadBackgroundBtn = () => {
  const [image, setImage] = useState<File>()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setImage(e.target.files[0])
  }

  return (
    <>
      <Button className='form-button' as='label' htmlFor="file-upload-btn">
        {image?.name || 'upload background'}
      </Button>
      <input type="file" accept="image/*" style={{ display: 'none' }} id="file-upload-btn" onChange={(e) => handleImageUpload(e)} />
    </>
  )
}

const Button = styled.button`
  width: 180px;
  margin: 20px auto 0px;
  color: #fff;
  text-align: center;
  background-color: var(--color-primary);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.8;
      color: #fff;
    }
  }
`
