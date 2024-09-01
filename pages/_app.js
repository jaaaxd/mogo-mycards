import "@/styles/globals.css";
import Head from "next/head";
import { GoogleAnalytics } from '@next/third-parties/google'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MOGO Mycards - Trading Message Generator</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <GoogleAnalytics gaId={process.env.GA_ID} />
      <Component {...pageProps} />
    </>
  );
}
