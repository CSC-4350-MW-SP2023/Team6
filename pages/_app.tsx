import type { AppProps } from "next/app";
import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Layout from "#/components/layout";
import { PDFViewer } from "@react-pdf/renderer";

function MyApp({ Component, pageProps }: AppProps) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Init>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Init>
    </SessionContextProvider>
  );
}
export default MyApp;
import "#/styles/globals.css";
import Init from "#/components/layout/Init";
