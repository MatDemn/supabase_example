import { z } from "zod";

export const newArticleSchema = z.object({
  title: z.string().min(1).max(150),
  shortSummary: z.string().min(1).max(150),
  content: z.string().min(1),
  tags: z
	.object({ name: z.string().min(1) })
	.array()
	.min(1),
  authorId: z.string().min(1),
});