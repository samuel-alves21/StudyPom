interface EyeIconProps {
  shouldShowPassword: boolean
  setShouldShowPassword: (value: boolean) => void
}

export const EyeIcon = (props: EyeIconProps) => {
  return (
    <>
      {props.shouldShowPassword ? (
        <i className='bi bi-eye-fill' onClick={() => props.setShouldShowPassword(false)}></i>
      ) : (
        <i className='bi bi-eye-slash-fill' onClick={() => props.setShouldShowPassword(true)}></i>
      )}
    </>
  )
}
