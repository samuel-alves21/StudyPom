import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useContext, useState } from 'react'
import { SpinnerCircular } from 'spinners-react'
import styled from 'styled-components'
import { storage } from '../../../../../firebase/config'
import { CustomizationContext, CustomizationContextType } from '../../../../../contexts/CustomizationContext'
import { UserContext, UserContextType } from '../../../../../contexts/UserContext'
import { SaveConfigContext, SaveConfigContextType } from '../../../../../contexts/SaveConfigContext'

export const UploadBackgroundBtn = () => {
  const {
    customizationState: { mainColor },
    customizationDispatch,
  } = useContext(CustomizationContext) as CustomizationContextType

  const {
    userState: { id, pendentUser },
  } = useContext(UserContext) as UserContextType

  const { saveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType

  const [isUploading, setIsUploading] = useState(false)

  const handleClick = () => {
    if (pendentUser) saveConfigDispatch({ type: 'SET_SIGN_IN_ALERT' })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (pendentUser) return
    if (!e.target.files) return
    const reference = ref(storage, `background/users/${id}/selected.png`)
    const uploadTask = uploadBytesResumable(reference, e.target.files[0])
    uploadTask.on(
      'state_changed',
      () => {
        setIsUploading(true)
      },
      (error) => {
        console.dir(error)
      },
      () => {
        setIsUploading(false)
        getDownloadURL(reference).then((url) => customizationDispatch({ type: 'CHANGE_BACKGROUND', payload: url }))
      }
    )
  }

  return (
    <>
      <Button className='form-button' as='label' htmlFor='file-upload-btn' onClick={handleClick}>
        {isUploading ? <SpinnerCircular speed={150} color={`${mainColor}`} size={25} /> : 'upload background'}
      </Button>
      <input
        type={pendentUser ? 'button' : 'file'}
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
