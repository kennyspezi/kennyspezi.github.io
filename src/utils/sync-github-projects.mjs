import { readFile, writeFile, rm } from "node:fs/promises";
import process from "node:process";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import {
  generateJournalMarkdown,
  generateProjectMarkdown,
} from "./sync-github-projects-md-template.mjs";

const username = process.env.GITHUB_USERNAME || process.argv[2] || "kennyspezi";
const token = process.env.GITHUB_TOKEN;

const headers = {
  Accept: "application/vnd.github+json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

const toSlug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toPosixPath = (value = "") => value.replace(/\\/g, "/");

const normalizeRepoRelativePath = (value = "") =>
  toPosixPath(value).trim().replace(/^\.\//, "").replace(/^\/+/, "");

const dirnamePosix = (value = "") => {
  const normalized = toPosixPath(value);
  const parts = normalized.split("/");
  parts.pop();
  return parts.join("/");
};

const joinRepoPath = (baseDir = "", relPath = "") => {
  const normalizedBase = normalizeRepoRelativePath(baseDir);
  const normalizedRel = normalizeRepoRelativePath(relPath);
  const joined = path.posix.normalize(
    normalizedBase
      ? path.posix.join(normalizedBase, normalizedRel)
      : normalizedRel,
  );
  return joined.replace(/^(\.\.\/)+/g, "").replace(/^\/+/, "");
};

const fetchJson = async (url) => {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API error ${response.status} for ${url}`);
  }
  return response.json();
};

const loadOverrides = async () => {
  try {
    const raw = await readFile(
      "src/content/data/project-overrides.json",
      "utf-8",
    );
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const loadIgnoredRepos = async () => {
  try {
    const raw = await readFile(
      "src/content/data/ignoredrepoentry.json",
      "utf-8",
    );
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((item) => String(item).toLowerCase())
      : [];
  } catch {
    return [];
  }
};

const hasCachedProjects = async () => {
  try {
    await readFile("src/content/data/github-projects.json", "utf-8");
    return true;
  } catch {
    return false;
  }
};

const buildRawRepoUrl = (repoFullName, branch, relPath) =>
  `https://raw.githubusercontent.com/${repoFullName}/${branch}/${normalizeRepoRelativePath(relPath)}`;

const findPreviewImage = async (fullName, defaultBranch, treeEntries = []) => {
  const extensions = ["jpeg", "jpg", "png", "webp", "gif"];

  for (const extension of extensions) {
    const previewUrl = `https://raw.githubusercontent.com/${fullName}/${defaultBranch}/assets/preview.${extension}`;
    try {
      const response = await fetch(previewUrl, { method: "HEAD" });
      if (response.ok) {
        return previewUrl;
      }
    } catch {
      continue;
    }
  }

  const imageEntries = treeEntries.filter(
    (entry) => entry.type === "blob" && isImagePath(entry.path),
  );
  const scoredCandidates = imageEntries
    .map((entry) => {
      const candidatePath = entry.path.toLowerCase();
      let score = 0;

      if (
        /\/preview\.(png|jpe?g|webp|gif)$/.test(candidatePath) ||
        /^preview\.(png|jpe?g|webp|gif)$/.test(candidatePath)
      ) {
        score += 100;
      }
      if (
        /\/cover\.(png|jpe?g|webp|gif)$/.test(candidatePath) ||
        /^cover\.(png|jpe?g|webp|gif)$/.test(candidatePath)
      ) {
        score += 80;
      }
      if (/\/hero\.(png|jpe?g|webp|gif)$/.test(candidatePath)) {
        score += 70;
      }
      if (candidatePath.includes("/assets/")) score += 20;
      if (candidatePath.includes("/docs/")) score += 15;
      if (candidatePath.includes("/images/")) score += 15;
      if (candidatePath.includes("/screenshots/")) score += 15;
      if (candidatePath.includes("/2024-25-cohort/")) score += 10;

      return {
        ...entry,
        score,
      };
    })
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));

  if (scoredCandidates[0]) {
    return buildRawRepoUrl(fullName, defaultBranch, scoredCandidates[0].path);
  }

  return "";
};

const isRelativeMarkdownPath = (value) => {
  if (!value) return false;
  const cleaned = value.trim();
  if (
    cleaned.startsWith("http://") ||
    cleaned.startsWith("https://") ||
    cleaned.startsWith("mailto:") ||
    cleaned.startsWith("tel:") ||
    cleaned.startsWith("#") ||
    cleaned.startsWith("//")
  ) {
    return false;
  }
  return true;
};

const toRepoBlobUrl = (repoFullName, branch, relPath) =>
  `https://github.com/${repoFullName}/blob/${branch}/${normalizeRepoRelativePath(relPath)}`;

const toRepoRawUrl = (repoFullName, branch, relPath) =>
  `https://raw.githubusercontent.com/${repoFullName}/${branch}/${normalizeRepoRelativePath(relPath)}`;

const isImagePath = (value) =>
  /\.(png|jpe?g|gif|webp|svg|avif|bmp)(\?.*)?$/i.test(
    String(value || "").trim(),
  );

const rewriteMarkdownLinks = (markdown, repoFullName, branch, baseDir = "") => {
  const collectedImages = [];

  // Rewrite relative markdown image links
  let output = markdown.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
    (match, alt, link) => {
      if (!isRelativeMarkdownPath(link)) {
        if (/^https?:\/\/.+\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(link)) {
          collectedImages.push(link);
        }
        return match;
      }
      const abs = toRepoRawUrl(
        repoFullName,
        branch,
        joinRepoPath(baseDir, link),
      );
      collectedImages.push(abs);
      return `![${alt}](${abs})`;
    },
  );

  // Rewrite relative markdown normal links
  output = output.replace(
    /(?<!!)\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
    (match, text, link) => {
      if (!isRelativeMarkdownPath(link)) {
        return match;
      }
      const abs = toRepoBlobUrl(
        repoFullName,
        branch,
        joinRepoPath(baseDir, link),
      );
      return `[${text}](${abs})`;
    },
  );

  // Rewrite relative markdown reference links: [id]: path
  output = output.replace(
    /^\s{0,3}\[([^\]]+)\]:\s*(\S+)(\s+"[^"]*")?\s*$/gm,
    (match, ref, link, title = "") => {
      if (!isRelativeMarkdownPath(link)) {
        return match;
      }
      const resolvedPath = joinRepoPath(baseDir, link);
      const abs = isImagePath(link)
        ? toRepoRawUrl(repoFullName, branch, resolvedPath)
        : toRepoBlobUrl(repoFullName, branch, resolvedPath);
      if (isImagePath(link)) {
        collectedImages.push(abs);
      }
      return `[${ref}]: ${abs}${title || ""}`;
    },
  );

  // Rewrite relative URLs in raw HTML tags (<img src>, <a href>)
  output = output.replace(
    /(<img\b[^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/gi,
    (match, prefix, url, suffix) => {
      if (!isRelativeMarkdownPath(url)) {
        return match;
      }
      const abs = toRepoRawUrl(
        repoFullName,
        branch,
        joinRepoPath(baseDir, url),
      );
      collectedImages.push(abs);
      return `${prefix}${abs}${suffix}`;
    },
  );
  output = output.replace(
    /(<a\b[^>]*\bhref=["'])([^"']+)(["'][^>]*>)/gi,
    (match, prefix, url, suffix) => {
      if (!isRelativeMarkdownPath(url)) {
        return match;
      }
      const abs = toRepoBlobUrl(
        repoFullName,
        branch,
        joinRepoPath(baseDir, url),
      );
      return `${prefix}${abs}${suffix}`;
    },
  );

  return { markdown: output, images: collectedImages };
};

const fetchRepoTree = async (repoFullName, branch) => {
  try {
    const response = await fetchJson(
      `https://api.github.com/repos/${repoFullName}/git/trees/${branch}?recursive=1`,
    );
    return Array.isArray(response?.tree) ? response.tree : [];
  } catch {
    return [];
  }
};

const JOURNAL_FILE_PATTERNS = [
  /^decisions?\.md$/i,
  /^design\.md$/i,
  /^design[-_ ]?decisions?\.md$/i,
  /^decision[-_ ]?log\.md$/i,
  /^dev[-_ ]?log\.md$/i,
  /^development[-_ ]?log\.md$/i,
  /^journal\.md$/i,
  /^engineering[-_ ]?journal\.md$/i,
];

const isJournalCandidate = (filePath) => {
  const normalized = toPosixPath(filePath).toLowerCase();
  const baseName = path.posix.basename(normalized);
  const dirName = dirnamePosix(normalized);

  if (!/\.(md|mdx)$/i.test(normalized)) {
    return false;
  }
  if (JOURNAL_FILE_PATTERNS.some((pattern) => pattern.test(baseName))) {
    return true;
  }
  if (
    baseName === "readme.md" &&
    /(decisions?|journal|devlog|logs?)/.test(dirName)
  ) {
    return true;
  }
  return false;
};

const extractMarkdownTitle = (content, fallback) => {
  const heading = String(content || "")
    .split("\n")
    .find((line) => /^#\s+/.test(line.trim()));
  if (heading) {
    return heading.replace(/^#\s+/, "").trim();
  }
  return fallback;
};

const humanizeFileName = (value) =>
  value
    .replace(/\.(md|mdx)$/i, "")
    .split(/[-_ ]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const fetchFileCommitDate = async (repoFullName, filePath) => {
  try {
    const commits = await fetchJson(
      `https://api.github.com/repos/${repoFullName}/commits?path=${encodeURIComponent(filePath)}&per_page=1`,
    );
    return commits?.[0]?.commit?.author?.date || "";
  } catch {
    return "";
  }
};

const syncGeneratedJournals = async ({
  repo,
  branch,
  slug,
  treeEntries,
  repoUpdatedAt,
}) => {
  const generatedEntries = treeEntries.filter(
    (entry) => entry.type === "blob" && isJournalCandidate(entry.path),
  );

  return Promise.all(
    generatedEntries.map(async (entry) => {
      const rawUrl = toRepoRawUrl(repo, branch, entry.path);
      let content = "";
      try {
        const response = await fetch(rawUrl, { headers });
        if (!response.ok) {
          return null;
        }
        content = await response.text();
      } catch {
        return null;
      }

      const rewritten = rewriteMarkdownLinks(
        content,
        repo,
        branch,
        dirnamePosix(entry.path),
      ).markdown;
      const fallbackTitle = humanizeFileName(path.posix.basename(entry.path));
      const title = extractMarkdownTitle(rewritten, fallbackTitle);
      const date =
        (await fetchFileCommitDate(repo, entry.path)) || repoUpdatedAt;

      return {
        title,
        date,
        projectSlug: slug,
        tags: ["github-sync", "repo-journal"],
        sourcePath: entry.path,
        sourceUrl: toRepoBlobUrl(repo, branch, entry.path),
        generated: true,
        body: rewritten,
        fileSlug: toSlug(entry.path),
      };
    }),
  ).then((entries) => entries.filter(Boolean));
};

const resolveForkSource = async (repo) => {
  if (!repo.fork) {
    return { forkedFrom: "", forkedFromUrl: "" };
  }

  const parentFromList = repo.parent;
  if (parentFromList?.full_name) {
    return {
      forkedFrom: parentFromList.full_name,
      forkedFromUrl: parentFromList.html_url || "",
    };
  }

  try {
    const detail = await fetchJson(
      `https://api.github.com/repos/${repo.full_name}`,
    );
    return {
      forkedFrom: detail.parent?.full_name || "",
      forkedFromUrl: detail.parent?.html_url || "",
    };
  } catch {
    return { forkedFrom: "", forkedFromUrl: "" };
  }
};

const run = async () => {
  const userRepos = await fetchJson(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
  );
  const existingOverrides = await loadOverrides();
  const ignoredRepos = new Set(await loadIgnoredRepos());

  // Load manual repo entries
  let manualRepos = [];
  try {
    const raw = await readFile(
      "src/content/data/manualrepoentry.json",
      "utf-8",
    );
    manualRepos = JSON.parse(raw);
  } catch {}

  // Fetch manual repos from GitHub
  const manualRepoObjs = await Promise.all(
    manualRepos.map(async (fullName) => {
      try {
        return await fetchJson(`https://api.github.com/repos/${fullName}`);
      } catch {
        return null;
      }
    }),
  );
  const allRepos = [...userRepos, ...manualRepoObjs.filter(Boolean)].filter(
    (repo) => !ignoredRepos.has(String(repo.full_name || "").toLowerCase()),
  );

  // Ensure output directory exists
  const projectsDir = path.resolve("src/content/projects");
  if (!existsSync(projectsDir)) {
    await mkdir(projectsDir, { recursive: true });
  }

  const generatedJournalDir = path.resolve(
    "src/content/projects/journal/generated",
  );
  await rm(generatedJournalDir, { recursive: true, force: true });
  await mkdir(generatedJournalDir, { recursive: true });

  const journalEntries = [];

  const projects = await Promise.all(
    allRepos.map(async (repo) => {
      let commits = [];
      const defaultBranch = repo.default_branch || "main";
      const treeEntries = await fetchRepoTree(repo.full_name, defaultBranch);
      const previewImage = await findPreviewImage(
        repo.full_name,
        defaultBranch,
        treeEntries,
      );
      const forkSource = await resolveForkSource(repo);

      let readme = "";
      let images = [];
      try {
        // Try to fetch README.md from GitHub
        const readmeRes = await fetch(
          `https://raw.githubusercontent.com/${repo.full_name}/${defaultBranch}/README.md`,
        );
        if (readmeRes.ok) {
          readme = await readmeRes.text();
          const rewritten = rewriteMarkdownLinks(
            readme,
            repo.full_name,
            defaultBranch,
          );
          readme = rewritten.markdown;
          images.push(...rewritten.images);
        }
      } catch {}

      // Add previewImage to images array if present
      if (previewImage) {
        images.push(previewImage);
      }
      images = [...new Set(images)];
      try {
        const commitData = await fetchJson(
          `https://api.github.com/repos/${repo.full_name}/commits?per_page=5`,
        );
        commits = commitData.map((item) => ({
          sha: item.sha,
          message: item.commit.message.split("\n")[0],
          date: item.commit.author?.date,
          url: item.html_url,
        }));
      } catch {
        commits = [];
      }

      // Merge in overrides (by repo full_name and by slug)
      const slug = toSlug(repo.name);
      const override = {
        ...(existingOverrides?.repos?.[repo.full_name] || {}),
        ...(existingOverrides?.slugs?.[slug] || {}),
      };

      const project = {
        slug,
        title: repo.name,
        description: repo.description || "No description provided yet.",
        repo: repo.full_name,
        status: override.status || (repo.archived ? "archived" : "idea"),
        contributorsWanted:
          typeof override.contributorsWanted === "boolean"
            ? override.contributorsWanted
            : Boolean(repo.open_issues_count),
        tech: Array.isArray(override.tech)
          ? override.tech
          : repo.language
            ? [repo.language]
            : [],
        tags: Array.isArray(override.tags)
          ? override.tags
          : Array.isArray(repo.topics)
            ? repo.topics
            : [],
        isFork: Boolean(repo.fork),
        forkedFrom: forkSource.forkedFrom,
        forkedFromUrl: forkSource.forkedFromUrl,
        updatedAt: repo.updated_at,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        previewImage,
        images,
        commits,
        cardEmoji: override.cardEmoji,
        statusNote: override.statusNote,
        links: {
          github: repo.html_url,
          homepage: repo.homepage || undefined,
        },
        manual: false,
      };

      const repoJournalEntries = await syncGeneratedJournals({
        repo: repo.full_name,
        branch: defaultBranch,
        slug,
        treeEntries,
        repoUpdatedAt: repo.updated_at,
      });
      journalEntries.push(...repoJournalEntries);

      // Write .md file for this project
      const mdContent = await generateProjectMarkdown(project, readme);
      const mdPath = path.join(projectsDir, `${slug}.md`);
      await writeFile(mdPath, mdContent, "utf-8");

      return project;
    }),
  );

  const seededRepoOverrides = projects.reduce((acc, project) => {
    acc[project.repo] = existingOverrides?.repos?.[project.repo] || {};
    return acc;
  }, {});

  for (const [repoKey, value] of Object.entries(
    existingOverrides?.repos || {},
  )) {
    if (!(repoKey in seededRepoOverrides)) {
      seededRepoOverrides[repoKey] = value;
    }
  }

  const nextOverrides = {
    _notes: existingOverrides?._notes || {
      howToUse:
        "Set custom project metadata per repo here. Use full GitHub repo names under repos or project slugs under slugs. Useful fields include status, statusNote, tags, tech, contributorsWanted, cardEmoji, hackathonName, hackathonUrl, replacementLabel, replacementUrl, buildsOnLabels, buildsOnUrls, forkedFrom, forkedFromUrl, previewImage, images, and links.",
      fieldGuide: {
        status: "One of the allowed status values below.",
        statusNote: "Small note shown on project cards and project pages.",
        tags: "Array of short topical labels.",
        tech: "Array of tools/languages/hardware labels.",
        contributorsWanted: "Boolean flag for collaboration.",
        cardEmoji: "Emoji shown before the project title.",
        hackathonName: "Name of the hackathon/event the project came from.",
        hackathonUrl: "Optional link to the event page.",
        replacementLabel:
          "Label for the newer project replacing an archived one, like Omnibot.",
        replacementUrl:
          "Link for the replacement project, like /projects/omnibot or /projects#omnibot.",
        buildsOnLabels:
          "Labels for older/related projects a newer one is building off of.",
        buildsOnUrls:
          "Links paired with buildsOnLabels, usually project slugs like /projects/battlebots.",
        forkedFrom: "Original project/repo name if this is a fork.",
        forkedFromUrl: "Link to the original project/repo.",
        previewImage: "Preferred card preview image URL.",
        images: "Extra image URLs for the project.",
        links: "Object with github, homepage, and/or demo URLs.",
      },
      allowedStatuses: [
        "idea",
        "researching",
        "building-now",
        "building-paused",
        "dormant",
        "archived",
        "blocked",
        "shipped",
      ],
    },
    repos: seededRepoOverrides,
    slugs: existingOverrides?.slugs || {},
  };

  await writeFile(
    "src/content/data/github-projects.json",
    `${JSON.stringify(projects, null, 2)}\n`,
    "utf-8",
  );
  await writeFile(
    "src/content/data/project-overrides.json",
    `${JSON.stringify(nextOverrides, null, 2)}\n`,
    "utf-8",
  );

  await Promise.all(
    journalEntries.map(async (entry) => {
      const journalPath = path.join(
        generatedJournalDir,
        entry.projectSlug,
        `${entry.fileSlug}.md`,
      );
      await mkdir(path.dirname(journalPath), { recursive: true });
      const content = await generateJournalMarkdown(
        {
          title: entry.title,
          date: entry.date,
          category: "projects",
          projectSlug: entry.projectSlug,
          tags: entry.tags,
          sourcePath: entry.sourcePath,
          sourceUrl: entry.sourceUrl,
          generated: true,
        },
        entry.body,
      );
      await writeFile(journalPath, content, "utf-8");
    }),
  );

  console.log(
    `Synced ${projects.length} repositories and ${journalEntries.length} generated journals`,
  );
};

run().catch(async (error) => {
  console.error(error.message);
  if (await hasCachedProjects()) {
    console.warn(
      "Using existing src/content/data/github-projects.json due to GitHub sync failure.",
    );
    process.exit(0);
  }
  process.exit(1);
});
