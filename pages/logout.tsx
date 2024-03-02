/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { serialize } from "cookie";

import Router from "next/router";

export default function Logout( redirect : any) {
  useEffect(() => {
    Router.push(redirect.redirect);
  }, []);

}

export async function getServerSideProps(context: { res: { setHeader: (arg0: string, arg1: string) => void; }; }) {
  const cookie = serialize("OAUTH_TOKEN", "", {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "lax",
  });

  context.res.setHeader("Set-Cookie", cookie);

  return {
    props: {
      redirect: "/",
    },
  };
}
