import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationContextProvider } from './notificationContext'
import { StatusCodeContextProvider } from './statusCodeContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <StatusCodeContextProvider>
        <App />
      </StatusCodeContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
