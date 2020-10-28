module.exports = {
  siteMetadata: {
    // Site title for pages other than homepage.
    siteTitle: 'Digital Garden',
    siteTitleDefault: 'Missing title',
    siteAuthor: 'Thilo Maier',
    siteDescription:
      '@maiertech/gatsby-theme-digital-garden is a Gatsby theme to hep you build your own digital garden.',
    siteUrl: 'https://digital-garden.themes.maier.tech',
    siteLanguage: 'en',
    siteTwitter: '454de6e',
  },
  plugins: [
    {
      resolve: '@maiertech/gatsby-theme-posts-core',
      options: {
        collection: 'posts',
        contentPath: 'content/posts',
        fullRelativePath: false,
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-posts-core',
      options: {
        collection: 'notes',
        contentPath: 'content/notes',
        fullRelativePath: true,
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-tags-core',
      options: {
        // This config results in tage pages being shifted down one level.
        tagCollection: 'posts/tags',
        mdxCollections: ['posts'],
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-tags-core',
      options: {
        // This config results in overwriting the notes page with the tags page.
        tagCollection: 'notes',
        mdxCollections: ['notes'],
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-theme-ui',
  ],
};
