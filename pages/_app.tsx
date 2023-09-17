import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import "@/styles/index.css";
import { api } from "@/utils/api";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import Head from "next/head";
import type { FrontMatter } from "./blog/[slug]";

const App: AppType<{ session: Session | null; frontMatter?: FrontMatter }> = ({
  Component,
  pageProps: { session, frontMatter, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Would You</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" />
        <link rel="canonical" href="https://wouldyoubot.gg" />
        {frontMatter?.thumbnail?.large ? (
          <>
            <meta
              key="og:image"
              name="og:image"
              content={frontMatter.thumbnail.large}
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

      <SessionProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="grow">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(App);
