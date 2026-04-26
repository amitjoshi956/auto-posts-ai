import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { isDevEnv } from '@base/config/env.ts';
import { qClient } from '@api/client.ts';
import App from './App.tsx';

import './index.scss';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={qClient}>
        <App />
        {isDevEnv && (
          <ReactQueryDevtools
            client={qClient}
            position="right"
            buttonPosition="bottom-right"
            initialIsOpen={false}
          />
        )}
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
