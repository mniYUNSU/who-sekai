/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import '../styles/globals.css';
import type { AppProps /*, AppContext */ } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { AuthUserProvider } from '@/contexts/auth_user.context';

function MyApp({ Component, pageProps }: AppProps) {
  const overrides = extendTheme({
    styles: {
      global: (props: any) => ({
        body: {
          bg: mode('gray.50', 'gray.900')(props),
        },
      }),
    },
  });

  return (
    <ChakraProvider theme={overrides}>
      <AuthUserProvider>
        {' '}
        <Component {...pageProps} />
      </AuthUserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
