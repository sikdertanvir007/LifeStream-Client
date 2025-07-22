import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'
import router from './router/Router.jsx'


createRoot(document.getElementById('root')).render(
 <StrictMode>
  <AuthProvider>
   
    <RouterProvider router={router}></RouterProvider>
    
    </AuthProvider>
     </StrictMode>,
)