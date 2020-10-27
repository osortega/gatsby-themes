const { createPath } = require('@maiertech/gatsby-helpers');

const createTagPath = require('./utils/create-tag-path');
const withDefaults = require('./utils/theme-options');

// Cannot be replaced by File System Route API since theme option `collection` is part of path for generated pages.
module.exports.createPages = async (
  { actions, graphql, reporter },
  themeOptions
) => {
  const { createPage } = actions;
  const options = withDefaults(themeOptions);
  const { basePath, tagCollection, mdxCollections } = options;

  // Use `group` to retrieve a list of all tags used in all supported mdxCollections.
  const result = await graphql(
    `
      query($mdxCollections: [String]!) {
        allMdx(filter: { fields: { collection: { in: $mdxCollections } } }) {
          group(field: frontmatter___tags) {
            tag: fieldValue
            count: totalCount
          }
        }
      }
    `,
    { mdxCollections }
  );

  if (result.errors) {
    reporter.error(
      `There was an error fetching all tags from these collections: ${mdxCollections}.`,
      result.errors
    );
    return;
  }

  // Tags are returned sorted alphabetically in query.
  const tags = result.data.allMdx.group.map(({ tag, count }) => ({
    tag,
    count,
    path: createTagPath({ basePath, tagCollection, tag }),
  }));

  // Create tags page.
  createPage({
    path: createPath(basePath, tagCollection),
    component: require.resolve('./src/templates/tags-query.js'),
    context: {
      tags,
      // Theme options can be used in shadowed pages.
      themeOptions: options,
    },
  });

  // Create tag pages
  tags.forEach(({ tag, path }) => {
    actions.createPage({
      path,
      component: require.resolve('./src/templates/tag-query.js'),
      context: {
        tag,
        // mdxCollections is required in page query.
        mdxCollections,
        // Theme options can be used in shadowed pages.
        themeOptions: options,
      },
    });
  });
};
