import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function bootstrap() {
  if (import.meta.env.PROD) {
    await import('../../react-icon-picker/dist/style.css')
  }
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

bootstrap()
