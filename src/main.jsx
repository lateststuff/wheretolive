import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { ChatbotProvider } from './context/ChatbotContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ChatbotProvider>
        <App />
      </ChatbotProvider>
    </AuthProvider>
  </React.StrictMode>,
) 