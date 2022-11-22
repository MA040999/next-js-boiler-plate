import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import "/node_modules/primeflex/primeflex.css"; 
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '../components/Layout';

export default function App({ Component, pageProps, router }: AppProps) {

  const isLayoutHidden = [`/login`].includes(router.pathname);

  const LayoutComponent = isLayoutHidden ? Fragment : Layout;

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity
      }
    }
  }))

  return <QueryClientProvider client={queryClient}>
    <LayoutComponent>
      <main className='m-4'>
        <Component {...pageProps} />
      </main>
    </LayoutComponent>
    <ReactQueryDevtools />
  </QueryClientProvider>
}
