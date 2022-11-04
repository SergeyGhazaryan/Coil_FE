import { AppProps } from "next/app";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <main className="app">
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
