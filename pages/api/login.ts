import type { NextApiHandler } from "next";
import type { RESTGetAPIUserResult } from "discord-api-types/v10";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import urlcat from "urlcat";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Configuration constants
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

// The URL that we will redirect to
const REDIRECT_URI = "http://localhost:3000/api/login";

// Scopes we want to be able to access as a user
const scope = ["identify", "guilds"].join(" ");

// URL to redirect to outbound (to request authorization)
const OAUTH_URL = urlcat("https://discord.com/api/oauth2/authorize", {
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  response_type: "code",
  scope,
});

/**
 * Exchanges an OAuth code for a full user object
 * @param code The code from the callback querystring
 */
async function exchangeCode(code: string) {
  const body = new URLSearchParams({
    client_id: CLIENT_ID || "",
    client_secret: CLIENT_SECRET || "",
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
    code,
    scope,
    state: uuidv4(),
  });


  const { data: auth } = await axios.post<{
    scope: string;
    access_token: string;
    token_type: string;
  }>("https://discord.com/api/oauth2/token", body.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const { data: user } = await axios.get<RESTGetAPIUserResult>(
    "https://discord.com/api/users/@me",
    { headers: { Authorization: `Bearer ${auth.access_token}` } },
  );

  return { user, auth };
}

/**
 * Generates the set-cookie header value from a given JWT token
 */
function getCookieHeader(token: string) {
  return serialize("token", token, {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60,
  });
}

const handler: NextApiHandler = async (req, res) => {
  // Find our callback code from req.query
  const { code = null } = req.query as { code?: string };

  // If it doesn't exist, we need to redirect the user
  // so that we can get the code
  if (typeof code !== "string") {
    res.redirect(OAUTH_URL);
    return;
  }

  // Exchange the code for a valid user object
  const response = await exchangeCode(code)

  console.log(response.auth.scope.includes("identify"))

  if (!response.auth.scope.includes("identify")) return { success: false, error: "Identify scope is missing" };
  if (!response.auth.scope.includes("guilds")) return { success: false, error: "Guilds scope is missing" };

  console.log("pogg")

  // Sign a JWT token with the user's details
  // encoded into it
  const token = sign(response.user, JWT_SECRET || "", { expiresIn: "24h" });

  // Serialize a cookie and set it
  const cookie = getCookieHeader(token);
  res.setHeader("Set-Cookie", cookie);

  // Redirect the user to wherever we want
  // in our application
  res.redirect("/");
};

export default handler;
