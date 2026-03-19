import { file, glob } from "astro/loaders";
import { reference, z } from "astro:content";
import { defineCollection } from "astro:content";

function slug() {
  return z
    .string()
    .min(3)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, "Invalid slug");
}

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/posts",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(128),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      category: reference("categories"),
      tags: z.array(reference("tags")).optional().default([]),
      summary: z.string().optional().default(""),
      cover: image().optional(),
      draft: z.boolean().default(false),
      new: z.boolean().default(false),
      projectSlug: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    slug: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    tech: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    links: z
      .object({
        homepage: z.string().url().optional(),
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .optional(),
    status: z
      .enum([
        "idea",
        "researching",
        "building-now",
        "building-paused",
        "dormant",
        "blocked",
        "shipped",
        "planning",
        "in-progress",
        "completed",
        "archived",
      ])
      .default("idea"),
    contributorsWanted: z.boolean().optional(),
    manual: z.boolean().optional(),
    cardEmoji: z.string().optional(),
    statusNote: z.string().optional(),
    repo: z.string().optional(),
    isFork: z.boolean().optional(),
    forkedFrom: z.string().optional(),
    forkedFromUrl: z.string().optional(),
    updatedAt: z.string().optional(),
    stars: z.number().optional(),
    forks: z.number().optional(),
    previewImage: z.string().optional(),
    images: z.array(z.string()).optional().default([]),
    hackathonName: z.string().optional(),
    hackathonUrl: z.string().url().optional(),
    replacementLabel: z.string().optional(),
    replacementUrl: z.string().optional(),
    buildsOnLabels: z.array(z.string()).optional().default([]),
    buildsOnUrls: z.array(z.string()).optional().default([]),
    commits: z
      .array(
        z.object({
          sha: z.string(),
          message: z.string(),
          date: z.string().optional(),
          url: z.string().optional(),
        }),
      )
      .optional(),
    image: z.string().optional(),
  }),
});

const categories = defineCollection({
  loader: file("./src/content/miscs/categories.json"),
  schema: ({ image }) =>
    z.object({
      name: z.string().max(32),
      slug: slug(),
      description: z
        .string()
        .max(512)
        .optional()
        .default("")
        .describe("In markdown format"),
      icon: z.string().optional().default("mdi:folder"),
    }),
});

const tags = defineCollection({
  loader: file("./src/content/miscs/tags.json"),
  schema: z.object({
    name: z.string().max(32),
    slug: slug(),
    description: z
      .string()
      .max(512)
      .optional()
      .default("")
      .describe("In markdown format"),
  }),
});

const friends = defineCollection({
  loader: file("./src/content/miscs/friends.json"),
  schema: z.object({
    name: z.string().max(64),
    description: z.string().optional().describe("One line string"),
    link: z.string().url(),
    avatar: z.string(),
  }),
});

const pages = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/pages",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const projectJournal = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects/journal",
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: reference("categories").optional(),
    projectSlug: z.string(),
    tags: z.array(z.string()).default([]),
    sourcePath: z.string().optional(),
    sourceUrl: z.string().url().optional(),
    generated: z.boolean().default(false),
  }),
});

const orgs = defineCollection({
  loader: glob({
    pattern: "*.json",
    base: "./src/content/orgs",
  }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    website: z.string().url().optional(),
    repoLinks: z.array(z.string()).default([]),
    logo: z.string().optional(),
    heroImage: z.string().optional(),
    relatedProjects: z.array(z.string()).default([]),
    positions: z
      .array(
        z.object({
          title: z.string(),
          startDate: z.coerce.date(),
          endDate: z.coerce.date().optional(),
          summary: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

const orgSummaries = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/orgs",
  }),
  schema: z.object({
    slug: z.string(),
    title: z.string().optional(),
    embedUrl: z.string().url().optional(),
  }),
});

export const collections = {
  posts,
  projects,
  categories,
  tags,
  friends,
  pages,
  projectJournal,
  orgs,
  orgSummaries,
};
