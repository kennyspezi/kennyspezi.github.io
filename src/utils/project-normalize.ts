export interface GitHubProject {
  title: string;
  description: string;
  tech: string[];
  tags: string[];
  links: {
    github?: string;
    homepage?: string;
    demo?: string;
  };
  status: string;
  contributorsWanted?: boolean;
  manual?: boolean;
  hackathonName?: string;
  hackathonUrl?: string;
  cardEmoji?: string;
  statusNote?: string;
  replacementLabel?: string;
  replacementUrl?: string;
  buildsOnLabels?: string[];
  buildsOnUrls?: string[];
  repo?: string;
  updatedAt?: string;
  previewImage?: string;
  images?: string[];
  commits?: Array<{
    sha: string;
    message: string;
    date?: string;
    url?: string;
  }>;
  isFork?: boolean;
  forkedFrom?: string;
  forkedFromUrl?: string;
}

export function getProjectOverride(project: any, overrides: any = {}) {
  const repoKey = String(project.repo || project.links?.github || "")
    .replace(/^https?:\/\/github\.com\//, "")
    .toLowerCase();
  const slugKey = String(project.slug || "").toLowerCase();
  const repoOverrides = Object.fromEntries(
    Object.entries(overrides?.repos || {}).map(([key, value]) => [
      String(key).toLowerCase(),
      value,
    ]),
  );
  const slugOverrides = Object.fromEntries(
    Object.entries(overrides?.slugs || {}).map(([key, value]) => [
      String(key).toLowerCase(),
      value,
    ]),
  );

  return {
    ...(repoKey ? repoOverrides[repoKey] || {} : {}),
    ...(slugKey ? slugOverrides[slugKey] || {} : {}),
  };
}

export function applyProjectOverride(project: any, overrides: any = {}) {
  const override = getProjectOverride(project, overrides);

  return {
    ...project,
    ...override,
    tags: Array.isArray(override.tags)
      ? override.tags
      : Array.isArray(project.tags)
        ? project.tags
        : [],
    tech: Array.isArray(override.tech)
      ? override.tech
      : Array.isArray(project.tech)
        ? project.tech
        : [],
    images: Array.isArray(override.images)
      ? override.images
      : Array.isArray(project.images)
        ? project.images
        : [],
    links: {
      ...(project.links || {}),
      ...(override.links || {}),
    },
  };
}

export function normalizeProject(
  p: any,
  isManual = false,
): GitHubProject & { slug: string } {
  return {
    ...p,
    slug:
      p.slug ||
      (p.title
        ? p.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
        : ""),
    tags: Array.isArray(p.tags) ? p.tags : [],
    tech: Array.isArray(p.tech) ? p.tech : [],
    contributorsWanted:
      typeof p.contributorsWanted === "boolean" ? p.contributorsWanted : false,
    manual: isManual || !!p.manual,
    links: p.links || {},
    status: p.status || "idea",
    title: p.title || "Untitled",
    description: p.description || "",
  };
}
