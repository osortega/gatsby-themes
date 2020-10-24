const { onCreateNode } = require('../gatsby-node');

describe('onCreateNode', () => {
  let createNode;
  let actions;
  let createNodeId;
  let createContentDigest;

  beforeAll(() => {
    // Create spy.
    createNode = jest.fn();
    actions = { createNode };

    // Create mocks.
    createNodeId = () => 'id';
    createContentDigest = () => 'digest';
  });

  beforeEach(() => {
    // Clear spy before each test.
    createNode.mockClear();
  });

  // No MDX collections defined means no Mdx nodes are processed for tags.
  it('empty mdxCollections array', () => {
    onCreateNode({
      actions,
      node: {},
      createNodeId,
      createContentDigest,
    });
    expect(createNode).not.toHaveBeenCalled();
  });

  // Nodes that are not Mdx nodes are not processed.
  it('process node which is not Mdx', () => {
    onCreateNode(
      {
        actions,
        node: { internal: { type: 'NotMdx' } },
        createNodeId,
        createContentDigest,
      },
      { mdxCollections: ['posts'] }
    );
    expect(createNode).not.toHaveBeenCalled();
  });

  // If Mdx node is not part of a collection it is not processed for tags.
  it('process Mdx node which does not belong to a collection', () => {
    onCreateNode(
      {
        actions,
        node: {
          internal: { type: 'Mdx' },
        },
        createNodeId,
        createContentDigest,
      },
      { mdxCollections: ['posts'] }
    );
    expect(createNode).not.toHaveBeenCalled();
  });

  it('process Mdx node with collection that is not part of mdxCollections', () => {
    onCreateNode(
      {
        actions,
        node: {
          fields: { collection: 'news' },
          internal: { type: 'Mdx' },
        },
        createNodeId,
        createContentDigest,
      },
      { mdxCollections: ['posts'] }
    );
    expect(createNode).not.toHaveBeenCalled();
  });

  it(
    'process Mdx node with matching collection but no tags',
    () => {
      onCreateNode({
        actions,
        node: { fields: { collection: 'posts' }, internal: { type: 'Mdx' } },
        createNodeId,
        createContentDigest,
      });
      expect(createNode).not.toHaveBeenCalled();
    },
    { mdxCollections: ['posts'] }
  );

  it('process Mdx node with matching collection and tags', () => {
    onCreateNode(
      {
        actions,
        node: {
          fields: { collection: 'posts' },
          frontmatter: { tags: ['tag1', 'tag2', 'tag3'] },
          internal: { type: 'Mdx' },
        },
        createNodeId,
        createContentDigest,
      },
      { mdxCollections: 'posts' }
    );

    // Verify that 3 tag nodes are created.
    expect(createNode).toHaveBeenCalledTimes(3);

    // Call for `tag1`.
    expect(createNode).toHaveBeenCalledWith({
      id: 'id',
      collection: 'tags',
      name: 'tag1',
      path: '/tags/tag1/',
      internal: {
        type: 'MdxTag',
        contentDigest: 'digest',
      },
    });

    // Call for `tag2`.
    expect(createNode).toHaveBeenCalledWith({
      id: 'id',
      collection: 'tags',
      name: 'tag2',
      path: '/tags/tag2/',
      internal: {
        type: 'MdxTag',
        contentDigest: 'digest',
      },
    });

    // Call for `tag3`.
    expect(createNode).toHaveBeenCalledWith({
      id: 'id',
      collection: 'tags',
      name: 'tag3',
      path: '/tags/tag3/',
      internal: {
        type: 'MdxTag',
        contentDigest: 'digest',
      },
    });
  });

  it('process Mdx node with matching collection and custom options basePath and tagCollection', () => {
    onCreateNode(
      {
        actions,
        node: {
          fields: { collection: 'posts' },
          frontmatter: { tags: ['category'] },
          internal: { type: 'Mdx' },
        },
        createNodeId,
        createContentDigest,
      },
      {
        basePath: 'custom',
        mdxCollections: 'posts',
        tagCollection: 'categories',
      }
    );

    // Verify that 3 tag nodes are created.
    expect(createNode).toHaveBeenCalledTimes(1);

    // Call for `category`.
    expect(createNode).toHaveBeenCalledWith({
      id: 'id',
      collection: 'categories',
      name: 'category',
      path: '/custom/categories/category/',
      internal: {
        type: 'MdxTag',
        contentDigest: 'digest',
      },
    });
  });
});
