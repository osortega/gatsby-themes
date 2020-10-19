module.exports = {
  plugins: [
    {
      resolve: '@maiertech/gatsby-theme-posts-core',
      options: { collection: 'posts', contentPath: 'content/posts' },
    },
    {
      resolve: '@maiertech/gatsby-theme-posts-core',
      options: { collection: 'news', contentPath: 'content/news' },
    },
    {
      resolve: '@maiertech/gatsby-theme-tags-core',
      options: { mdxCollections: ['posts', 'news'] },
    },
  ],
};