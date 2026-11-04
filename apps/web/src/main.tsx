import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import posthog from 'posthog-js'

import App from './App.tsx'
import './index.css'

if (import.meta.env.VITE_POSTHOG_PROJECT_TOKEN) {
  posthog.init(import.meta.env.VITE_POSTHOG_PROJECT_TOKEN, {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
    defaults: '2026-08-30',
    autocapture: false,
    capture_pageview: true,
    disable_session_recording: true,
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
