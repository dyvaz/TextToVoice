import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{ colorScheme: 'light' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Head>
        <title>TextToVoice</title>
        <link rel="icon" href="/logo.png" type="image/png" />      </Head>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
