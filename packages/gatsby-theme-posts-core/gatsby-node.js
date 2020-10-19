const {
  createPath,
  ensurePathExists,
  mdxResolverPassthrough,
  slugify,
} = require('@maiertech/gatsby-helpers');

const withDefaults = require('./theme-options');

module.exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const { contentPath } = withDefaults(themeOptions);
  ensurePathExists(contentPath, reporter);
};

module.exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    interface Post @nodeInterface {
      id: ID!
      collection: String!
      title: String!
      author: String!
      date: Date! @dateformat
      description: String!
      body: String!
      path: String!
    }

    type MdxPost implements Node & Post {
      id: ID!
      collection: String!
      title: String!
      author: String!
      date: Date! @dateformat
      description: String!
      body: String!
      path: String!
    }
  `);
};

module.exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    MdxPost: { body: { resolve: mdxResolverPassthrough('body') } },
  });
};

module.exports.onCreateNode = (
  { actions, createNodeId, createContentDigest, getNode, node },
  themeOptions
) => {
  const { collection, fullRelativePath } = withDefaults(themeOptions);

  // Process MDX nodes only.
  if (node.internal.type !== 'Mdx') {
    return;
  }

  // Parent (file node) makes `name` option from `gatsby-source-filesystem` available as `sourceInstanceName`.
  // Process nodes from same collection only.
  const parent = getNode(node.parent);
  if (parent.sourceInstanceName !== collection) {
    return;
  }

  const nodeData = {
    collection,
    ...node.frontmatter,
  };

  const { relativeDirectory } = parent;

  nodeData.path = createPath(
    '/',
    collection,
    // Decide whether or not to omit relativeDirectory in path.
    fullRelativePath ? slugify(relativeDirectory) : '',
    slugify(nodeData.title)
  );

  const nodeType = 'MdxPost';

  actions.createNode({
    id: createNodeId(`${nodeType}-${collection}-${node.id}`),
    parent: node.id,
    ...nodeData,
    internal: {
      type: nodeType,
      contentDigest: createContentDigest(node.internal.contentDigest),
    },
  });

  // Add collection to Mdx node.
  actions.createNodeField({
    node,
    name: 'collection',
    value: collection,
  });

  // Add path to Mdx node.
  actions.createNodeField({
    node,
    name: 'path',
    value: nodeData.path,
  });
};

// Cannot be replaced by File System Route API since theme option `collection` is part of path of generated pages.
module.exports.createPages = async (
  { actions, graphql, reporter },
  themeOptions
) => {
  const { createPage } = actions;
  const options = withDefaults(themeOptions);
  const { collection } = options;

  // Query all posts that belong to the same collection.
  // Sort order matters to determine next and previous posts.
  const result = await graphql(
    `
      query($collection: String!) {
        allPost(
          sort: { fields: date, order: DESC }
          filter: { collection: { eq: $collection } }
        ) {
          nodes {
            id
            path
          }
        }
      }
    `,
    { collection }
  );

  if (result.errors) {
    reporter.error('There was an error fetching posts.', result.errors);
  }

  const posts = result.data.allPost.nodes;

  // Create posts page.
  createPage({
    path: createPath(collection),
    component: require.resolve('./src/templates/posts-query.js'),
    context: {
      collection,
      themeOptions: options,
    },
  });

  // Create post pages
  posts.forEach((node, index) => {
    actions.createPage({
      path: node.path,
      component: require.resolve('./src/templates/post-query.js'),
      context: {
        id: node.id,
        prev: index === 0 ? null : posts[index - 1].id,
        next: index === posts.length - 1 ? null : posts[index + 1].id,
        themeOptions: options,
      },
    });
  });
};
