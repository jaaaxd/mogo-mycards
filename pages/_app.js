import "@/styles/globals.css";
import { Quicksand } from '@next/font/google';

const quicksand = Quicksand({
  weight: ['400', '500', '600', '700'], // Specify the font weights you need
  subsets: ['latin'], // Specify the subsets you need
});

export default function App({ Component, pageProps }) {
  return (
    <div className={quicksand.className}>
      <Component {...pageProps} />
    </div>
  );
}
