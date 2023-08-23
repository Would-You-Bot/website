import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import DiscordUser from "@/types/user";
interface UserType {
  user: DiscordUser;
  iat: number;
  exp: number;
}
export default async function Account(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.redirect("/");
  const token = req.cookies.token ?? req.headers["authorization"];
  if (!token) return res.json({ message: "No auth :(" });
  const data = verify(token, process.env.KEY as string) as UserType;
  if (!("id" in data))
    return res.json({
      message: "No auth :(",
    });

  return res.json({
    message: "auth :)",
    user: {
      ...data,
      staff: (process.env?.STAFF || "")
        .split(" ")
        .includes(data.id as string),
    },
  });
}
