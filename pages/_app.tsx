import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import "@/styles/index.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Would You - The Discord Bot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" />
        {pageProps.frontMatter?.thumbnail?.large ? (
          <>
            <meta
              key="og:image"
              name="og:image"
              content={pageProps.frontMatter.thumbnail.large}
            />
          </>
        ) : (
          <>
            <meta
              key="og:image"
              property="og:image"
              content="https://i.imgur.com/OPQaiVa.png"
            />
          </>
        )}
      </Head>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="grow">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  );
}
