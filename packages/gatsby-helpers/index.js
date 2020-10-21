const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');

const filter = require('lodash.filter');
const slugify = require('@sindresorhus/slugify');

// Helper to create path from segments and add leading and trailing /.
function createPath(...segments) {
  const path = join(...segments);
  // Add leading and trailing / if there are none.
  // /^\/*/ matches zero or more occurrences of / at the beginning.
  // /\/*$/ matches zero or more occurrences of / at the end.
  return path.replace(/^\/*/, `/`).replace(/\/*$/, `/`);
}

// Helper to ensure that a path exists.
/* istanbul ignore next */
function ensurePathExists(path, reporter) {
  if (existsSync(path)) {
    return;
  }
  reporter.warn(`Creating ${path}.`);
  mkdirSync(path, { recursive: true });
}

// https://lodash.com/docs/4.17.15#filter
function filterNodes(data, filters) {
  // Figure out key name, e.g. `allPost` or `allTag`.
  const key = Object.keys(data)[0];
  const nodes = data[key].nodes;

  if (!nodes) return [];

  return filter(nodes, filters);
}

// Helper to resolve fields on Mdx nodes.
/* istanbul ignore next */
function mdxResolverPassthrough(fieldName) {
  return async (source, args, context, info) => {
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
}

module.exports = {
  createPath,
  ensurePathExists,
  filterNodes,
  mdxResolverPassthrough,
  slugify,
};
