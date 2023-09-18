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

      const guildData = await fetch(`${DISCORD_ENDPOINT}/guilds/${guild.id}`, {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      });

      guild.botInServer = guildData.status === 200;
      if (guildData.status !== 200) continue;

      const guildDataJson = await guildData.json();
      if (guildDataJson) guild.banner = guildDataJson.banner;
    }

    guildsData = guildsData
      .filter((g) => parseInt(g.permissions) & 0x20)
      .sort((g) => (g.botInServer && g.owner ? -1 : g.botInServer ? 0 : 1));

    return guildsData;
  }),
});
