/* eslint-disable camelcase */
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect } from "react";


function generateCookieHeader(name: string, value: string) {
  return serialize(name, value, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60,
  });
}

async function exchangeAuthorizationCode(code: string) {
  const requestBody = new URLSearchParams({
    client_id: process.env.CLIENT_ID || "",
    client_secret: process.env.CLIENT_SECRET || "",
    redirect_uri: process.env.REDIRECT_URI || "",
    grant_type: "authorization_code",
    code,
  });

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    });

    const { access_token, token_type, scope } = await tokenResponse.json();

    if (!scope.includes("identify")) return { success: false, error: "Identify scope is missing" };
    if (!scope.includes("guilds")) return { success: false, error: "Guilds scope is missing" };

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });

    const { id, username, avatar } = await userResponse.json();

    if (scope.includes("guilds") && scope.includes("guilds.join")) {
      const guildsResponse = await fetch(
        "https://discord.com/api/users/@me/guilds",
        {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        }
      );

      const guilds = await guildsResponse.json();

      if (scope.includes("guilds.join") && guilds?.length <= 100) {
        await fetch(
          `https://discord.com/api/guilds/1009562516105461780/members/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token_type} ${access_token}`,
            },
            body: JSON.stringify({
              access_token,
            }),
          }
        );
      }
    }

    return { success: true, user: { id, avatar, username, access_token } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export default function Login( redirect: any) {
  const router = useRouter();

  useEffect(() => {
    router.push(redirect.redirect);
  }, []);
  
}


export async function getServerSideProps(context: any) {
  const { code, error, redirect } = context.query;

  if (typeof code !== "string") {
    const oauthScope = ["identify", "guilds" ];

    if (error) {
      return { props: { redirect: "/" } };
    } else {
      context.res.setHeader(
        "Set-Cookie",
        generateCookieHeader("OAUTH_REDIRECT", redirect ?? "")
      );
      const oauthRedirect = `https://discord.com/oauth2/authorize?response_type=code&client_id=${
        process.env.CLIENT_ID
      }&redirect_uri=${process.env.REDIRECT_URI}&scope=${oauthScope.join(" ")}&prompt=none`;
      return { props: { redirect: oauthRedirect } };
    }
  }

  const { success, user } = await exchangeAuthorizationCode(code);

  if (!success)
    return { props: { redirect: "/" + context.req.cookies.OAUTH_REDIRECT } };


  const oauthToken = sign({ user }, process.env.JWT_SECRET || "", {
    expiresIn: "24h",
  });

  context.res.setHeader(
    "Set-Cookie",
    generateCookieHeader("OAUTH_TOKEN", oauthToken)
  );

  console.log(
    "info  - " +
      `${user?.username ?? 'Unknown User'} (${user?.id ?? 'Unknown ID'})` +
      " logged-in on " +
      new Date().toUTCString()
  );

  return {
    props: {
      redirect: "/" + context.req.cookies.OAUTH_REDIRECT,
    },
  };
}