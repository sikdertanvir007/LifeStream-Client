import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'
import router from './router/Router.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
 <StrictMode>
  <QueryClientProvider client={queryClient}>
  <HelmetProvider>
  <AuthProvider>
   
    <RouterProvider router={router}></RouterProvider>
    
    </AuthProvider>
    </HelmetProvider>
    </QueryClientProvider>
     </StrictMode>,
)