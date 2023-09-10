import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './Login.tsx'
import App from './App.tsx'
import { Register } from './Register.tsx'
import { EmailVerification } from './EmailVerification.tsx'
import { ErrorPage } from './ErrorPage.tsx'
import { PasswordReset } from './PasswordReset.tsx'

const router = createBrowserRouter(
  [
    {
      path: '/StudyPom',
      element: <App />,
    },
    {
      path: '/StudyPom/login',
      element: <Login />,
    },
    {
      path: '/StudyPom/register',
      element: <Register />,
    },
    {
      path: '/StudyPom/emailVerification/:origin',
      element: <EmailVerification />,
    },
    {
      path: '/StudyPom/passwordReset',
      element: <PasswordReset />,
    },
    {
      path: '*',
      element: <ErrorPage />,
    }
  ]
)

export const Pages = () => {
  return <RouterProvider router={router} fallbackElement/>
}
