import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Mount the root React component into the element defined in index.html.
createRoot(document.getElementById('root')).render(
  // StrictMode helps identify potential problems during development.
  <StrictMode>
    <App />
  </StrictMode>,
)
