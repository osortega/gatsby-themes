const withDefaults = require('./theme-options');

module.exports = (themeOptions) => {
  const { contentPath, mdxOtherwiseConfigured } = withDefaults(themeOptions);
  return {
    plugins: [
      !mdxOtherwiseConfigured && { resolve: 'gatsby-plugin-mdx', options: {} },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'pages',
          path: contentPath,
        },
      },
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
    ].filter(Boolean),
  };
};
