import type { AppProps } from "next/app";
import AuthProvider from "@/contexts/Auth";

import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.css";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" />
    </AuthProvider>
  );
}
