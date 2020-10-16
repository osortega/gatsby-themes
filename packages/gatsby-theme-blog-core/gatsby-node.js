const {
  createPath,
  ensurePathExists,
  generateNodeFromMdx,
  mdxResolverPassthrough,
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
  const { collection } = withDefaults(themeOptions);

  const postNode = generateNodeFromMdx(
    collection,
    `MdxPost`,
    node,
    getNode,
    createNodeId,
    createContentDigest,
    false
  );

  if (postNode) {
    actions.createNode({
      ...postNode,
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
  const { collection } = options;

  const result = await graphql(`
    query {
      allPost(sort: { fields: date, order: DESC }) {
        nodes {
          id
          path
        }
      }
    }
  `);

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
