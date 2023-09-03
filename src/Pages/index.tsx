import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './Login.tsx'
import App from './App.tsx'
import { Register } from './Register.tsx'

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
  ],
  { basename: '/StudyPom' }
)

export const Pages = () => {
  return <RouterProvider router={router} />
}
