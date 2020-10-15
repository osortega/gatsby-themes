const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');

const slugify = require('@sindresorhus/slugify');

// Helper to ensure that a path exists.
const ensurePathExists = (path, reporter) => {
  if (existsSync(path)) {
    return;
  }
  reporter.warn(`Creating ${path}.`);
  mkdirSync(path, { recursive: true });
};

// Helper to create path from segments and add leading and trailing /.
const createPath = (...segments) => {
  const path = join(...segments);
  // Add leading and trailing / if there are none.
  // /^\/*/ matches zero or more occurrences of / at the beginning.
  // /\/*$/ matches zero or more occurrences of / at the end.
  return path.replace(/^\/*/, `/`).replace(/\/*$/, `/`);
};

// Helper to generate a node from Mdx parent node.
const generateNodeFromMdx = (
  collection,
  nodeType,
  node,
  getNode,
  createNodeId,
  createContentDigest,
  withRelativeDirectory = true
) => {
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
    ...node.frontmatter,
  };

  const { relativeDirectory, name } = parent;

  // Fallback to the parent name if no title is set.
  if (!node.frontmatter.title) {
    nodeData.title = name;
  }

  nodeData.path = createPath(
    '/',
    collection,
    // Decide whether or not to omit relativeDirectory in path.
    withRelativeDirectory ? slugify(relativeDirectory) : '',
    slugify(nodeData.title)
  );

  nodeData.data = { ...node.frontmatter, rawBody: node.rawBody };

  return {
    id: createNodeId(`${nodeType}-${collection}-${node.id}`),
    parent: node.id,
    ...nodeData,
    internal: {
      type: nodeType,
      contentDigest: createContentDigest(node.internal.contentDigest),
    },
  };
};

// Helper to resolve fields on Mdx nodes.
const mdxResolverPassthrough = (fieldName) => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const value = await resolver(mdxNode, args, context, {
    fieldName,
  });

  return value.items ? value.items : value;
};

module.exports = {
  createPath,
  ensurePathExists,
  generateNodeFromMdx,
  mdxResolverPassthrough,
  slugify,
};
