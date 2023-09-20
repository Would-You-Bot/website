import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const packsPerPage = 10;

// TODO: Pagination

export const packsRouter = createTRPCRouter({
  getPacksByType: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) =>
      ctx.schemas.QuestionPack.find({ type: input, reviewed: true })
        .limit(packsPerPage)
        .exec(),
    ),

  getLikedPacks: protectedProcedure.query(async ({ ctx }) =>
    ctx.schemas.QuestionPack.find({ likes: ctx.session.user.id })
      .limit(packsPerPage)
      .exec(),
  ),

  getUnreviewedPacks: protectedProcedure.query(async ({ ctx }) =>
    ctx.schemas.QuestionPack.find({ reviewed: false })
      .limit(packsPerPage)
      .exec(),
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

  likePack: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session.user.id;

      const pack = await ctx.schemas.QuestionPack.findById(input).exec();
      if (!pack) throw new Error("Pack not found");

      const alreadyLiked = pack.likes.includes(id);

      if (alreadyLiked) pack.likes = pack.likes.filter((i) => i !== id);
      else pack.likes.push(id);

      await pack.save();
    }),
});
