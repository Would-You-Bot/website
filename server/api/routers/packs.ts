import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const packsRouter = createTRPCRouter({
  getPacks: protectedProcedure.query(async ({ ctx }) =>
    ctx.schemas.QuestionPack.find().exec(),
  ),

  createPack: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        questions: z.array(z.string()),
        type: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.schemas.QuestionPack.create({
        author: ctx.session.user.id,
        ...input,
      }),
    ),
});
