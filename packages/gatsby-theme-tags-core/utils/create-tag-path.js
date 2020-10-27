const { createPath, slugify } = require('@maiertech/gatsby-helpers');

module.exports = ({ basePath, tagCollection, tag }) =>
  createPath(basePath, tagCollection, slugify(tag));
