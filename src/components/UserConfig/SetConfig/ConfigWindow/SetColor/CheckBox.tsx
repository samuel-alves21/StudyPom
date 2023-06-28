interface Props {
  setMainColorIsChecked: (value: boolean) => void
}

export const CheckBox = ({ setMainColorIsChecked }: Props) => {
  const checkBoxHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'main-color') {
      if (!mainColorBox.current?.checked) {
        setMainColorIsChecked(false)
        setTheClikedOne('main')
      } else {
        setMainColorIsChecked(true)
        setSecundaryColorIsChecked(false)
      }
    } 
    else {
      if (!secundaryColorBox.current?.checked) {
        setTheClikedOne('secundary')
        setSecundaryColorIsChecked(false)
      } else {
        setMainColorIsChecked(false)
        setSecundaryColorIsChecked(true)
      }
    }
  }

  return (
    <Box
      type='checkbox'
      id='secundary-color'
      ref={secundaryColorBox}
      onChange={(e) => checkBoxHandleChange(e)}
    />
  )
}

const Box = styled.input`
  margin-left: 5px;
`