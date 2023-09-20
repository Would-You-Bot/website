import { discordRouter } from "./routers/discord";
import { packsRouter } from "./routers/packs";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  discord: discordRouter,
  packs: packsRouter,
});

export type AppRouter = typeof appRouter;
