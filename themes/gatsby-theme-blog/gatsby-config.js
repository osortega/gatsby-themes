module.exports = ({
  assetPath = 'content/assets/posts',
  basePath = '/',
  contentPath = 'content/posts',
}) => ({
  siteMetadata: {
    title: 'Title placeholder from @maiertech/gatsby-theme-blog',
    basePath,
  },
  plugins: [
    { resolve: 'gatsby-plugin-mdx', options: {} },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: contentPath,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: assetPath,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
});
