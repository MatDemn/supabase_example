import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const articleRouter = createTRPCRouter({
    getBatch: publicProcedure
    .input(
        z.object({
            limit: z.number(),
            cursor: z.string().nullish(),
            skip: z.number().optional(),
        })
    )
    .query(async ({ctx, input}) => {
        const { limit, cursor, skip } = input;
        const articles = await ctx.db.article.findMany({
            take: limit + 1,
            skip: skip,
            cursor: cursor ? {id: cursor} : undefined,
            orderBy: {
                createdAt: 'desc',
            },
        });
        let nextCursor: typeof cursor | undefined = undefined;
        if(articles.length > limit) {
            const nextItem = articles.pop();
            nextCursor = nextItem?.id;
        }
        return {
            articles,
            nextCursor,
        }
    })
});