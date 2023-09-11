import { discordRouter } from "./routers/discord";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  discord: discordRouter,
});

export type AppRouter = typeof appRouter;
