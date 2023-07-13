import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './Login.tsx'
import App from './App.tsx'

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
  ],
  { basename: '/StudyPom' }
)

export const Pages = () => {
  return <RouterProvider router={router} />
}
