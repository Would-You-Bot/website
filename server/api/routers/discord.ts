import { getAccessTokenFromRequest } from "@/server/auth";
import { DISCORD_ENDPOINT, Guild, getGuildIconUrl } from "@/utils/discord";
import { createTRPCRouter, protectedProcedure } from "../trpc";

type UserGuilds = Guild & { botInServer: boolean };

export const discordRouter = createTRPCRouter({
  getManageableGuilds: protectedProcedure.query(async ({ ctx }) => {
    const accessToken = await getAccessTokenFromRequest(ctx.req);

    const guilds = await fetch(`${DISCORD_ENDPOINT}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (guilds.status !== 200) {
      console.error(guilds.statusText);
      throw new Error("Failed to fetch guilds");
    }

    let guildsData = (await guilds.json()) as UserGuilds[];

    for (const guild of guildsData) {
      guild.icon = getGuildIconUrl(guild);

      // TODO: Mongo query
      guild.botInServer = false;
    }

    guildsData = guildsData
      .filter((g) => parseInt(g.permissions) & 0x20)
      .sort((g) => (g.botInServer && g.owner ? -1 : g.botInServer ? 0 : 1));

    return guildsData;
  }),
});
