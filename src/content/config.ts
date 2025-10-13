import { defineCollection, z } from "astro:content";

const cards = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    number: z.string(),
    release_date: z.date(),
    collection_name: z.string(),
    image: z.string().optional(),
    first_edition: z.boolean().optional(),
    holographic: z.boolean().optional(),
    missing: z.boolean().optional(),
    notes: z.string().optional(),
  }),
});

export const collections = { cards };