import { useContext } from 'react'
import { LoginContext, LoginContextType } from '../../contexts/LoginContext'
import { useNavigate } from 'react-router-dom'

export const PageSwitch = () => {
  const { isLogin } = useContext(LoginContext) as LoginContextType

  const navigate = useNavigate()

  const handleChangePage = () => {
    if (isLogin) {
      navigate('/StudyPom/register')
    } else {
      navigate('/StudyPom/login')
    }
  }

  return (
    <p>
      {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
      &nbsp;
      <span className='navigation-span' onClick={handleChangePage}>
        {isLogin ? 'Sign up' : 'Login'}
      </span>
    </p>
  )
}
