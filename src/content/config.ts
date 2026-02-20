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
    extra: z.boolean().optional(),
    missing: z.boolean().optional(),
    notes: z.string().optional(),
  }),
});

const artworks = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    head_artwork: z.string(), // slug of the head artwork card
    grouped_artworks: z.array(
      z.union([
        z.string(), // Support plain string format
        z.object({ card: z.string() }), // Support Decap CMS object format
      ])
    ),
  }),
});

export const collections = { cards, artworks };