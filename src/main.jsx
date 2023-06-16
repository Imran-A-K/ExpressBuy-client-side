import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthenticationProviders from './providers/AuthenticationProviders.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import React from 'react'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthenticationProviders>
      <div className='max-w-screen-xl mx-auto'>
      <RouterProvider router={router} />
      </div>
    </AuthenticationProviders>
    </QueryClientProvider>
   
    
  </React.StrictMode>,
)
