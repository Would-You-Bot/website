import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import type DiscordUser from "@/types/user";
import { NextApiRequest, NextApiResponse } from "next";
const REDIRECT_URI = `http://localhost:3000/api/login`;
const scopes = ["identify"];
export default async function OAuth(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.redirect("/");

  const { code = null, error = null, state = "{}" } = req.query;
  const {server} = JSON.parse(state as any);
  if (error) return res.redirect(`/`);
  if (server) scopes.push("guilds.join");
  const OAUTH_QS = new URLSearchParams({
    client_id: process.env.CLIENT_ID as string,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: scopes.join(" "),
  }).toString();

  const OAUTH_URI = `https://discord.com/api/oauth2/authorize?${OAUTH_QS}`;

  if (!code || typeof code !== "string") return res.redirect(OAUTH_URI);

  const body = new URLSearchParams({
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.SECRET as string,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
    code,
    scope: scopes.join(" "),
  }).toString();

  const { access_token = null, token_type = "Bearer", scope} = await fetch(
    "https://discord.com/api/oauth2/token",
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body,
    }
  ).then((res) => res.json())

  if (!access_token || typeof access_token !== "string") return res.redirect(OAUTH_URI);
    

  const me: DiscordUser | { unauthorized: true } = await fetch(
    "https://discord.com/api/users/@me",
    {
      headers: { Authorization: `${token_type} ${access_token}` },
    }
  ).then((res) => res.json());

  if (!("id" in me)) return res.redirect(OAUTH_URI);
  if(scope.includes("guilds.join")) fetch(`https://discord.com/api/guilds/${process.env.GUILD_ID as string}/members/${me.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bot ' + process.env.DISCORD_TOKEN,
    },
    body: JSON.stringify({
      access_token: access_token,
    }),
  }).then(response => response.json())
 

  const token = sign(me, process.env.KEY as string, { expiresIn: "24h" });

  res.setHeader(
    "Set-Cookie",
    serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      path: "/",
    })
  );

  res.redirect("/");
}
