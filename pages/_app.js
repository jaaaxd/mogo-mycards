import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <main className="font-quicksand">
      <Component {...pageProps} />
    </main>
  );
}
