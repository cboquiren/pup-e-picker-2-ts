import { z } from "zod";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
  nickName: z.string().optional()
});

export type Dog = z.infer<typeof dogSchema>;

export type ActiveSelectorType = "all" | "favorited" | "unfavorited" | "create";

