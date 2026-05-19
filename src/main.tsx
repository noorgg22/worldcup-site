import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Remove the SSR fallback content once React takes over
const ssrFallback = document.getElementById('ssr-fallback');
if (ssrFallback) ssrFallback.remove();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
