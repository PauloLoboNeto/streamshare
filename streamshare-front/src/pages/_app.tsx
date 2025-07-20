import type { AppProps } from "next/app";
import './../lib/styles/global-styles.scss'; // Import global styles

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
