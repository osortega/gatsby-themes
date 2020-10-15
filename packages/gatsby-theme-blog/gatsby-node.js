const {
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
      body: String!
      data: JSON
      path: String!
    }

    type MdxPost implements Node & Post {
      id: ID!
      collection: String!
      title: String!
      author: String!
      body: String!
      data: JSON
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
    createContentDigest
  );

  if (postNode) {
    actions.createNode({
      ...postNode,
    });
  }
};
