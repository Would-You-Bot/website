import { GetServerSidePropsContext } from "next";
import type DiscordUser from "@/types/user";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";

export function parseUser(ctx: GetServerSidePropsContext): DiscordUser | null {
  if (!ctx.req.headers.cookie) {
    return null;
  }

  const token = parse(ctx.req.headers.cookie)["token"];

  if (!token) {
    return null;
  }

  try {
    const { iat, exp, ...user } = verify(token, "thisissosafelmao") as any
    return user;
  } catch (e) {
    return null;
  }
}