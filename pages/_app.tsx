import "@/styles/globals.css";
import "@/styles/index.css";
import { useAtom } from "jotai";
import { Provider as JotaiProvider } from 'jotai';
import type { AppProps } from "next/app";
import { useEffect } from "react";
import * as state from "@/utils/state"
export default function App({ Component, pageProps }: AppProps) {
  const [_, setUser] = useAtom(state.User);
  useEffect(() => {
    fetch("/api/account")
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "auth :)") setUser(data.user)
      });
  }, []);
  return  <JotaiProvider><Component {...pageProps} /></JotaiProvider>;
}
