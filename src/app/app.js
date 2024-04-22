import './globals.css';
import Head from 'next/head';
import RootLayout from './layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kuai Sourcing</title>
        <meta name="description" content="Sourcing to africa based in china" />
        <link rel="icon" href="/favicon.ico"  />
      </Head>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}

export default MyApp;
