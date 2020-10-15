const withDefaults = require('./theme-options');

module.exports = (themeOptions) => {
  const { collection, contentPath } = withDefaults(themeOptions);
  return {
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: collection,
          path: contentPath,
        },
      },
    ],
  };
};
