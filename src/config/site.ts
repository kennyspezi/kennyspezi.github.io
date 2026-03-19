const meta = {
  title: "Meet Kenny",
  description:
    "I'm an electrical engineering student based in Texas. I love tinkering with and learning about all kinds of electronics. Feel free to snoop around, I've got many projects I'm excited to work on!",
  author: 'Karla "Kenny" Madrigal',
  logo: "/tigerlogo.png",
  ogImage: "/og.jpg",
  lang: "en",
  keywords:
    "kennyspezi, electronics, student, projects, tinkering, learning, engineering, electrical engineering, hobbyist",
  mail: "kennyspezi@proton.me",
  linkedin: "https://www.linkedin.com/in/karla-kenny-madrigal/",
  resume: "/assets/resume.pdf",
  url: import.meta.env.PUBLIC_SITE_URL || "https://kennyspezi.github.io/",
} as const;

const social = [
  { name: "GitHub", href: "https://github.com/kennyspezi", icon: "mdi:github" },
  { name: "Email", href: `mailto:${meta.mail}`, icon: "mdi:email" },
  ...(meta.linkedin
    ? [{ name: "LinkedIn", href: meta.linkedin, icon: "mdi:linkedin" }]
    : []),
] as const;

const site = {
  // --- Site Metadata ---
  meta,

  // --- Navigation ---
  // subtitle: decorative label shown below the name (uppercase, small text)
  navigation: [
    { name: "Home", subtitle: "Index", href: "/", icon: "mdi:home-outline" },
    {
      name: "Posts",
      subtitle: "Musings",
      href: "/posts",
      icon: "mdi:notebook-outline",
    },
    {
      name: "Projects",
      subtitle: "Works",
      href: "/projects",
      icon: "mdi:hammer-wrench",
    },
    {
      name: "Organizations",
      subtitle: "Where to find me",
      href: "/orgs",
      icon: "mdi:account-group-outline",
    },
    {
      name: "About",
      subtitle: "Me",
      href: "/about",
      icon: "mdi:account-circle-outline",
    },
  ],

  // --- Social Links ---
  social,

  // --- Homepage Hero ---
  hero: {
    greeting: "i'm kenny! welcome to my personal website 🥭",
    // Supports HTML. Use <span class="font-medium text-foreground underline decoration-primary/30"> to highlight keywords
    description:
      "snoop around for some projects and musings, or just get to know me :^].",
    cards: [
      {
        icon: "mdi:explore",
        label: "status",
        value: "finally doing homework?",
      },
      { icon: "mdi:location", label: "location", value: "houston, texas 🤠" },
    ],
  },

  // --- Footer ---
  footer: {
    copyright: "© 2025 Breeze",
    builtWith:
      "Built with Astro. Forked from <a href='https://github.com/linftyz/astro-theme-breeze'>Breeze</a>",
  },

  // --- Comments ---
  comments: {
    enabled: false,
    provider: "artalk" as const,
    artalk: {
      server: "https://your-artalk-server.com",
    },
  },

  // --- Feature Toggles ---
  features: {
    search: true,
    rss: true,
    // Auto-mark posts as "new" if published within this many days (0 to disable)
    newPostDays: 7,
  },

  // --- Tools Page Data ---
  tools: [
    {
      name: "development",
      items: [
        {
          name: "VS Code",
          link: "https://code.visualstudio.com",
          icon: "mdi:microsoft-visual-studio-code",
        },
        { name: "KiCad", link: "https://kicad.org", icon: "mdi:chip" },
        {
          name: "PlatformIO",
          link: "https://platformio.org",
          icon: "mdi:console-network-outline",
        },
        { name: "Terminal", icon: "mdi:terminal" },
        { name: "Git", link: "https://git-scm.com", icon: "mdi:git" },
        { name: "Linux", link: "https://www.linux.org", icon: "mdi:linux" },
      ],
    },
  ],

  // --- UI Labels ---
  // Customize these values to change the text displayed on pages
  labels: {
    postsTitle: "Writing",
    postsDescription: "Notes, thoughts, and technical musings",
    projectsTitle: "Projects",
    projectsDescription: "Small tools built for fun or to solve real problems.",
    friendsTitle: "Friends",
    friendsDescription: "Like-minded folks around the web.",
    toolsTitle: "Stack",
    aboutTitle: "About",
    aboutDescription: "About this site and its author",
    backToPosts: "Back to posts",
    goHome: "Go Home",
    notFoundTitle: "Page not found",
    notFoundDescription:
      "The page you're looking for may have been removed or the link is broken.",
    endOfPost: "End of Post",
    tableOfContents: "Table of Contents",
    searchPlaceholder: "Search posts, tags, or commands...",
    searchNavigate: "Navigate",
    commentSuccess: "Comment submitted",
  },

  ogImage: "/og-image.png",
} as const;

export default site;
