export interface GitHubProject {
  title: string;
  subtitle?: string;
  checklist?: Array<{
    key: string;
    status: "done" | "inprogress" | "todo";
    title: string;
  }>;
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
  startDate?: string;
  endDate?: string;
  lessonsLearned?: string;
  pending?: string;
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

export function getProjectOverride(
  project: any,
  overrides: any = {},
): Record<string, any> {
  const repoKey = String(project.repo || project.links?.github || "")
    .replace(/^https?:\/\/github\.com\//, "")
    .toLowerCase();
  const slugKey = String(project.slug || "").toLowerCase();
  const titleKey = String(project.title || "")
    .trim()
    .toLowerCase();
  const repoOverrides: Record<string, any> = Object.fromEntries(
    Object.entries(overrides?.repos || {}).map(([key, value]) => [
      String(key).toLowerCase(),
      value,
    ]),
  );
  const slugOverrides: Record<string, any> = Object.fromEntries(
    Object.entries(overrides?.slugs || {}).map(([key, value]) => [
      String(key).toLowerCase(),
      value,
    ]),
  );
  const titleOverrides: Record<string, any> = Object.fromEntries(
    Object.entries(overrides?.titles || {}).map(([key, value]) => [
      String(key).trim().toLowerCase(),
      value,
    ]),
  );

  return {
    ...(repoKey ? repoOverrides[repoKey] || {} : {}),
    ...(slugKey ? slugOverrides[slugKey] || {} : {}),
    ...(titleKey ? titleOverrides[titleKey] || {} : {}),
  };
}

export function projectDateValue(value: unknown): number {
  if (!value) return 0;
  if (value instanceof Date) return value.getTime();

  const text = String(value).trim();
  if (text.toLowerCase() === "current" || text.toLowerCase() === "present") {
    return Number.MAX_SAFE_INTEGER;
  }

  const semester = text.match(/^(spring|summer|fall|winter)\s+(\d{4})$/i);
  if (semester) {
    const monthByTerm: Record<string, number> = {
      winter: 0,
      spring: 2,
      summer: 5,
      fall: 8,
    };
    return new Date(
      Number(semester[2]),
      monthByTerm[semester[1].toLowerCase()],
      1,
    ).getTime();
  }

  const parsed = new Date(text).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function normalizeChecklist(value: unknown) {
  const entries = Array.isArray(value)
    ? value.map((item, index) => [String(index + 1), item])
    : value && typeof value === "object"
      ? Object.entries(value)
      : [];

  return entries.flatMap(([key, item]) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const rawStatus = String(record.status || "todo").toLowerCase();
    const status =
      rawStatus === "done"
        ? "done"
        : rawStatus === "inprogress" || rawStatus === "in-progress"
          ? "inprogress"
          : "todo";
    const title = String(record.title || "").trim();
    return title ? [{ key, status, title }] : [];
  });
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
    subtitle: p.subtitle || "",
    checklist: normalizeChecklist(p.checklist),
    startDate: p.startDate,
    endDate: p.endDate,
    lessonsLearned: p.lessonsLearned || "",
    pending: p.pending || "",
    title: p.title || "Untitled",
    description: p.description || "",
  };
}
