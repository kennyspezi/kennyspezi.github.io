import { getCollection } from "astro:content";

export const getProjectJournals = async () => {
  const entries = await getCollection("projectJournal");

  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

export const getProjectJournalsForProject = async (projectSlug: string) => {
  const entries = await getProjectJournals();
  return entries.filter((entry) => entry.data.projectSlug === projectSlug);
};
