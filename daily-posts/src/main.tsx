import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './utils/Context.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from './pages/Profile.tsx'
import ExplorePage from './pages/Explore.tsx'
import UserPage from './pages/UserPage.tsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:'/explore',
    element:<ExplorePage/>
  },
  {
    path:"user/:userName",
    element:<UserPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
    <RouterProvider router={router}/>
    </UserProvider>
  </StrictMode>
)
