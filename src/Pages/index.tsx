import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Register } from './Login.tsx'
import App from './App.tsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/login',
      element: <Register />,
    },
  ],
  { basename: '/StudyPom' }
)

export const Pages = () => {
  return <RouterProvider router={router} />
}
