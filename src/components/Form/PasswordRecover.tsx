import { useNavigate } from "react-router-dom"

export const PasswordRecover = () => {
  const navigate = useNavigate()

  const handleClick = async () => {
    navigate('/StudyPom/passwordReset')
  }

  return <span className="navigation-span" onClick={handleClick}>Forgot your password?</span>
}