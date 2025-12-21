# Portfolio Migration - Kenny Madrigal

This is my fork of [the ANGIE theme on Astro](https://github.com/anthonylan/angie)

## 🎨 Custom Features Implemented

### Components
- **GitHubProjects.astro** - Fetches and displays repos from GitHub API (kennyspezi)
- **SpotifyPlayer.astro** - Fixed bottom-right floating Spotify playlist widget
- **GitHubStatus.astro** - Shows recent GitHub activity using Events API
- **Essays.astro** - Displays essay PDFs with links
- **Organizations.astro** - Shows IEEE@UH and ForkTheCity cards
- **SocialFeed.astro** - Aggregates posts from LinkedIn, YouTube, Instagram via Juicer.io
- **Header.astro** - Custom navigation: Home, About, Arts-n-Crafts, Posts

### Pages
- **index.astro** - Hero splash page with animated GIF background, welcome message, and social icons
- **about.astro** - Personal bio, current work, interests, social links, and GitHub status
- **arts-n-crafts.astro** - Personal projects (GitHub), Organizations, and Essays sections
- **posts.astro** - Social media feed using Juicer.io integration

### Theme
- **Purple/Plum color scheme** matching the original Jekyll site:
  - Primary Purple: `#540066`
  - Dark Purple: `#37003c`
  - Darker Purple: `#1a0033`
  - Darkest Purple: `#2e003e`
  - Pink Accent: `#ff9fff`
  - Cyan Accent: `#a0ffea`

## 🚀 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Configuration Notes

### Social Feed (Juicer.io)
The social feed component uses Juicer.io to aggregate posts from LinkedIn, YouTube, and Instagram. 

**To set up:**
1. Create a free account at [juicer.io](https://www.juicer.io/)
2. Connect your LinkedIn, YouTube, and Instagram accounts
3. Get your feed name/ID
4. Update the `juicerFeedName` variable in `src/components/SocialFeed.astro`

### GitHub API
The GitHub components fetch data from:
- **Projects**: `https://api.github.com/users/kennyspezi/repos`
- **Status**: `https://api.github.com/users/kennyspezi/events/public`

No authentication is required for public repos, but rate limits apply (60 requests/hour).

### Spotify Widget
Update the playlist URL in `src/components/SpotifyPlayer.astro` to change the embedded playlist.

## 📁 Assets

All assets from the Jekyll site have been migrated to `/public/assets/`:
- `/public/assets/gif/` - GIF files (my-gif.gif, nyan-cat.gif)
- `/public/assets/images/` - Images (avatar.jpg)
- `/public/assets/essays/` - PDF essays

## 🎯 Next Steps & Customization Ideas

1. **Add blog posts** - Set up Astro Content Collections for blog posts
2. **Analytics** - Add Google Analytics or similar
3. **SEO** - Create SEO component with meta tags
4. **Performance** - Optimize images with Astro's Image component
5. **Animations** - Add GSAP animations (already installed)
6. **Dark mode toggle** - Add light/dark theme switcher
7. **Contact form** - Add a contact form on the about page

## 📦 Dependencies

- **astro** - Static site generator
- **tailwindcss** - Utility-first CSS framework
- **gsap** - Animation library
- **@tailwindcss/vite** - Tailwind CSS Vite integration

## 🔧 Tech Stack

- **Framework**: Astro 5.5.3
- **Styling**: Tailwind CSS 4.1.1 + Custom CSS
- **Fonts**: Space Grotesk (Google Fonts), Remix Icon
- **APIs**: GitHub REST API, Juicer.io
- **Deployment**: Static site (GitHub Pages, Netlify, Vercel compatible)

## 📄 License

Same as original Jekyll site.
