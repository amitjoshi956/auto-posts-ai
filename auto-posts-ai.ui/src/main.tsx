import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from './App.tsx';

import './index.scss';

const qClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={qClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
