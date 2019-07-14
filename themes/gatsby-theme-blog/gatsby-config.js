module.exports = {
  siteMetadata: {
    title: 'Title placeholder from @maiertech/gatsby-theme-blog',
    basePath: '/',
  },
  plugins: [
    { resolve: 'gatsby-plugin-mdx', options: {} },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'content/posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'content/assets/posts',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
};
