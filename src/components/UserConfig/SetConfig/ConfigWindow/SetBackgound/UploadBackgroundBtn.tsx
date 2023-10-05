import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useContext, useState } from 'react'
import { SpinnerCircular } from 'spinners-react'
import styled from 'styled-components'
import { storage } from '../../../../../firebase/config'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { UserContext, UserContextType } from '../../../../../contexts/UserContext'

export const UploadBackgroundBtn = () => {
  const {
    customizationState: { mainColor },
    customizationDispatch,
  } = useContext(CustomizationContext) as CustomizationContextType
  const {
    userState: { id },
  } = useContext(UserContext) as UserContextType

  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const reference = ref(storage, `background/users/${id}/selected.png`)
    const uploadTask = uploadBytesResumable(reference, e.target.files[0])
    uploadTask.on(
      'state_changed',
      () => {
        console.log('uploading...')
        setIsUploading(true)
      },
      (error) => {
        console.log(error)
      },
      () => {
        console.log('upload complete')
        setIsUploading(false)
        getDownloadURL(reference).then((url) => customizationDispatch({ type: 'CHANGE_BACKGROUND', payload: url }))
      }
    )
  }

  return (
    <>
      <Button className='form-button' as='label' htmlFor='file-upload-btn'>
        {isUploading ? <SpinnerCircular speed={150} color={`${mainColor}`} size={25} /> : 'upload background'}
      </Button>
      <input
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        id='file-upload-btn'
        onChange={(e) => handleImageUpload(e)}
      />
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
