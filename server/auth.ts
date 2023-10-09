import { type GetServerSidePropsContext, type NextApiRequest } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { decode } from "next-auth/jwt";
import DiscordProvider from "next-auth/providers/discord";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: ({ token, account }) => {
      if (account) {
        // Inserts access token into the jwt so we can use it in discord API requests
        return {
          ...token,
          access_token: account.access_token,
        };
      }
      return token;
    },
    signIn: () => {
      return "/guilds";
    },
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify guilds",
        },
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

/**
 * Helper function to get the discord access token from the session cookie.
 */
export const getAccessTokenFromRequest = async (req: NextApiRequest) => {
  const token = req.cookies["next-auth.session-token"] as string;
  if (!token) throw new Error("No session token");

  const jwt = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET as string,
  });
  if (!jwt) throw new Error("Invalid JWT");

  return jwt.access_token as string;
};
