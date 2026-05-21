import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CatProvider } from './Hooks/catContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CatProvider>
      <App />
    </CatProvider>
  </StrictMode>,
);
