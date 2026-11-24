import Head from 'next/head';
// Fontit omina tiedostoina (ei ulkoisia pyyntöjä Google Fontsiin)
import '@fontsource/montecarlo/400.css';
import '@fontsource/jost/400';
import '@fontsource/jost/500';
import '@fontsource/jost/600';
import '../styles/lava.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
