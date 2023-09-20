import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const packsRouter = createTRPCRouter({
  getPacks: protectedProcedure.query(async ({ ctx }) =>
    ctx.schemas.QuestionPack.find().exec(),
  ),

  createPack: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        description: z.string(),
        tags: z.array(z.string()).min(1, "You must have at least 1 tag"),
        questions: z
          .array(z.string())
          .min(5, "You must have at least 5 questions"),
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
