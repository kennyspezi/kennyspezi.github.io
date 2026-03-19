// Template for generating .md files for each GitHub project
// This is a helper for updating sync-github-projects.mjs

/**
 * Generate frontmatter for a project
 * @param {object} project - The normalized project object
 * @returns {string}
 */
export async function generateFrontmatter(project) {
  // Remove undefined/null fields
  const clean = (obj) => {
    if (Array.isArray(obj)) return obj.map(clean);
    if (obj && typeof obj === "object") {
      const out = {};
      for (const [k, v] of Object.entries(obj)) {
        if (
          v !== undefined &&
          v !== null &&
          v !== "" &&
          !(Array.isArray(v) && v.length === 0)
        ) {
          out[k] = clean(v);
        }
      }
      return out;
    }
    return obj;
  };
  const yaml = await import("js-yaml");
  return "---\n" + yaml.dump(clean(project)) + "---\n";
}

/**
 * Generate .md file content for a project
 * @param {object} project - The normalized project object
 * @param {string} readme - The README.md content (optional)
 * @returns {string}
 */
export async function generateProjectMarkdown(project, readme = "") {
  const frontmatter = await generateFrontmatter(project);
  return (
    frontmatter +
    "\n" +
    (readme ? readme : `# ${project.title}\n\n${project.description || ""}`)
  );
}

/**
 * Generate .md content for a synced project journal document
 * @param {object} entry - The journal frontmatter fields
 * @param {string} body - The markdown body
 * @returns {string}
 */
export async function generateJournalMarkdown(entry, body = "") {
  const frontmatter = await generateFrontmatter(entry);
  return frontmatter + "\n" + body;
}
