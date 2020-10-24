module.exports = (themeOptions) => ({
  basePath: '/',
  collection: 'posts',
  contentPath: 'content/posts',
  fullRelativePath: false,
  mdxOtherwiseConfigured: false,
  ...themeOptions,
});
