import '../styles/globals.css'
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";        
import "primeicons/primeicons.css";  
import type { AppProps } from 'next/app'
import { Fragment, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '../components/Layout';

export default function App({ Component, pageProps, router }: AppProps) {

  const isLayoutHidden = [`/login`].includes(router.pathname);

  const LayoutComponent = isLayoutHidden ? Layout : Fragment;

  const [queryClient] = useState(() => new QueryClient())

  return <QueryClientProvider client={queryClient}>
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
    <ReactQueryDevtools />
  </QueryClientProvider>
}
