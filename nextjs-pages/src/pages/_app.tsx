import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "primereact/resources/themes/lara-dark-cyan/theme.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
