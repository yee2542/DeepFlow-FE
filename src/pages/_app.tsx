import { ApolloProvider } from '@apollo/client';
import HomeNavbar from 'Modules/home/components/Navbar';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { useRouter } from 'next/router';
import React from 'react';
import { Provider } from 'react-redux';
import { client } from 'Services/client';
import { store } from 'Stores/index';
import { GlobalStyle } from 'Styles/global';
import 'out/i18n.ts';

const INCLUDE_NAVBAR: string[] = ['/'];

export function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const pathname = useRouter().pathname;
  const isIncludeNavbar = INCLUDE_NAVBAR.includes(pathname);

  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ApolloProvider client={client}>
          {isIncludeNavbar && <HomeNavbar />}
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </>
  );
}

export default MyApp;
