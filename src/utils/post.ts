import { getCollection } from "astro:content";

export const getPosts = async () => {
  const posts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  return posts.sort((a, b) => {
    const aDate = new Date(a.data.createdAt).getTime();
    const bDate = new Date(b.data.createdAt).getTime();
    return bDate - aDate;
  });
};

export const getRecentPosts = async (num: number) => {
  return (await getPosts()).slice(0, num);
};

export const getPublishedPosts = async () => {
  const posts = await getCollection("posts", ({ data }) => data.draft !== true);

  return posts.sort((a, b) => {
    const aDate = new Date(a.data.createdAt).getTime();
    const bDate = new Date(b.data.createdAt).getTime();
    return bDate - aDate;
  });
};
