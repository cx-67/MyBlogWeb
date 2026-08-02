import { defineConfig } from 'astro/config';

// !!!IMPORTANT!!!
// Deploying to GitHub Pages under a project site (https://<user>.github.io/<repo>/)
// requires the repo name as base. Update this to your actual repo name.
// If deploying to a user/organization site (https://<user>.github.io/), set base to '/'.
export default defineConfig({
  site: 'https://cx-67.github.io',
  base: '/MyBlogWeb',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
