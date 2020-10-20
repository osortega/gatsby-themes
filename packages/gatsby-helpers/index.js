const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');

const slugify = require('@sindresorhus/slugify');

// Helper to ensure that a path exists.
/* istanbul ignore next */
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

// Helper to resolve fields on Mdx nodes.
/* istanbul ignore next */
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
  mdxResolverPassthrough,
  slugify,
};
