import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '../components/Layout';
import { Provider } from "react-redux";
import { store } from "../store";

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
    <Provider store={store}>
      <LayoutComponent>
        <main className='m-4'>
          <Component {...pageProps} />
        </main>
      </LayoutComponent>
    </Provider>
    <ReactQueryDevtools />
  </QueryClientProvider>
}
