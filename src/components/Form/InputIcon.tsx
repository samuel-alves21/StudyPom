import { FormInputType } from '.'

interface InputIconProps {
  id: FormInputType
}

export const InputIcon = ({ id }: InputIconProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const thisElement = e.target as HTMLElement
    const nextElement = thisElement.nextElementSibling as HTMLElement
    nextElement.focus()
  }

  return (
    <>
      {id === 'username' && <i className='bi bi-person-circle' onClick={(e) => handleClick(e)}></i>}
      {id === 'email' && <i className='bi bi-envelope-fill' onClick={(e) => handleClick(e)}></i>}
      {id === 'password' && <i className='bi bi-key-fill' onClick={(e) => handleClick(e)}></i>}
      {id === 'confirmedPassword' && (
        <i className='bi bi-key-fill' onClick={(e) => handleClick(e)}></i>
      )}
    </>
  )
}
