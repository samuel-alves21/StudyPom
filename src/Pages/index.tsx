import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './Login.tsx'
import App from './App.tsx'
import { Register } from './Register.tsx'
import { EmailVerification } from './EmailVerification.tsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/emailVerification/:origin',
      element: <EmailVerification />,
    },
  ],
  { basename: '/StudyPom' }
)

export const Pages = () => {
  return <RouterProvider router={router} />
}
