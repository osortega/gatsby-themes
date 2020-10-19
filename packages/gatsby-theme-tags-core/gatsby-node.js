const { createPath, slugify } = require('@maiertech/gatsby-helpers');

const withDefaults = require('./theme-options');

module.exports.createSchemaCustomization = ({ actions }) => {
  /* istanbul ignore next */
  actions.createTypes(`
    interface Tag @nodeInterface {
      id: ID!
      collection: String!
      name: String!
      path: String!
    }

    type MdxTag implements Node & Tag {
      id: ID!
      collection: String!
      name: String!
      path: String!
    }
  `);
};

module.exports.onCreateNode = (
  { actions, node, createNodeId, createContentDigest },
  themeOptions
) => {
  const { basePath, tagCollection, mdxCollections } = withDefaults(
    themeOptions
  );

  // If mdxCollections is empty array, no tag nodes are generated.
  if (!mdxCollections.length) {
    return;
  }

  // Process MDX nodes only.
  if (node.internal && node.internal.type !== 'Mdx') {
    return;
  }

  // If node does not belong to a collection do not process it.
  if (!node.fields || !node.fields.collection) {
    return;
  }

  // Collection must be included in mdxCollections.
  if (!mdxCollections.includes(node.fields.collection)) {
    return;
  }

  const tags = node.frontmatter.tags;
  // Create an `MdxTag` for each tag.
  // If it existed before, it will be overwritten.
  if (tags) {
    const nodeType = 'MdxTag';
    tags.forEach((name) => {
      const tagNode = {
        collection: tagCollection,
        name,
        path: createPath(basePath, tagCollection, slugify(name)),
      };

      actions.createNode({
        id: createNodeId(`${nodeType}-${tagCollection}-${name}`),
        ...tagNode,
        internal: {
          type: nodeType,
          contentDigest: createContentDigest(
            `${nodeType}-${tagCollection}-${name}`
          ),
        },
      });
    });
  }
};

// Cannot be replaced by File System Route API since theme option `collection` is part of path of generated pages.
module.exports.createPages = async (
  { actions, graphql, reporter },
  themeOptions
) => {
  const { createPage } = actions;
  const options = withDefaults(themeOptions);
  const { basePath, tagCollection, mdxCollections } = options;

  // Query all tags that belong to the same collection.
  const result = await graphql(
    `
      query($collection: String!) {
        allTag(filter: { collection: { eq: $collection } }) {
          nodes {
            name
            path
          }
        }
      }
    `,
    { collection: tagCollection }
  );

  if (result.errors) {
    reporter.error('There was an error fetching tags.', result.errors);
  }

  const tags = result.data.allTag.nodes;

  // Create tags page.
  createPage({
    path: createPath(basePath, tagCollection),
    component: require.resolve('./src/templates/tags-query.js'),
    context: {
      collection: tagCollection,
      themeOptions: options,
    },
  });

  // Create tag pages
  tags.forEach((node) => {
    actions.createPage({
      path: node.path,
      component: require.resolve('./src/templates/tag-query.js'),
      context: {
        // mdxCollections is required in page query.
        mdxCollections,
        name: node.name,
        themeOptions: options,
      },
    });
  });
};
