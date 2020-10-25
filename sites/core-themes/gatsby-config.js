module.exports = {
  plugins: [
    'gatsby-plugin-mdx',
    {
      resolve: '@maiertech/gatsby-theme-pages-core',
      options: {
        contentPath: 'content/pages',
        fullRelativePath: true,
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-posts-core',
      options: {
        collection: 'posts',
        contentPath: 'content/posts',
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-posts-core',
      options: {
        collection: 'news',
        contentPath: 'content/news',
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-tags-core',
      options: { mdxCollections: ['posts', 'news'] },
    },
  ],
};
