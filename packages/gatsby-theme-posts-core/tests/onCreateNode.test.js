const { onCreateNode } = require('../gatsby-node');

describe('onCreateNode', () => {
  let actions;
  let createNode;
  let createNodeField;
  let createNodeId;
  let createContentDigest;
  let getNode;

  beforeAll(() => {
    // Create spies.
    createNode = jest.fn();
    createNodeField = jest.fn();
    getNode = jest.fn();
    actions = { createNode, createNodeField };

    // Create mocks.
    createNodeId = () => 'id';
    createContentDigest = () => 'digest';
  });

  beforeEach(() => {
    // Clear spies before each test.
    createNode.mockClear();
    createNodeField.mockClear();
    getNode.mockClear();
  });

  it('process node which is not Mdx', () => {
    onCreateNode({
      actions,
      node: { internal: { type: 'NotMdx' } },
      getNode,
      createNodeId,
      createContentDigest,
    });
    expect(getNode).not.toHaveBeenCalled();
    expect(createNode).not.toHaveBeenCalled();
  });

  it('process Mdx node from wrong collection', () => {
    onCreateNode(
      {
        actions,
        node: { internal: { type: 'Mdx' } },
        getNode: () => ({
          sourceInstanceName: 'news',
        }),
        createNodeId,
        createContentDigest,
      },
      { collection: 'posts' }
    );
    expect(createNode).not.toHaveBeenCalled();
  });

  it('process Mdx node from the matching collection', () => {
    onCreateNode({
      actions,
      node: {
        id: '1234',
        frontmatter: { title: 'A title with multiple words' },
        internal: { type: 'Mdx' },
      },
      getNode: () => ({
        sourceInstanceName: 'posts',
        relativeDirectory: 'subdir',
      }),
      createNodeId,
      createContentDigest,
    });

    // Check that one MdxPost has been created.
    expect(createNode).toHaveBeenCalledTimes(1);
    expect(createNode).toHaveBeenCalledWith({
      id: 'id',
      parent: '1234',
      collection: 'posts',
      title: 'A title with multiple words',
      path: '/posts/a-title-with-multiple-words/',
      internal: { type: 'MdxPost', contentDigest: 'digest' },
    });

    // Check that 2 fields have been added to Mdx node.
    expect(createNodeField).toHaveBeenCalledTimes(2);
    expect(createNodeField).toHaveBeenCalledWith({
      node: {
        id: '1234',
        frontmatter: { title: 'A title with multiple words' },
        internal: { type: 'Mdx' },
      },
      name: 'collection',
      value: 'posts',
    });
    expect(createNodeField).toHaveBeenCalledWith({
      node: {
        id: '1234',
        frontmatter: { title: 'A title with multiple words' },
        internal: { type: 'Mdx' },
      },
      name: 'path',
      value: '/posts/a-title-with-multiple-words/',
    });
  });

  it('process Mdx node from the matching collection with custom options', () => {
    onCreateNode(
      {
        actions,
        node: {
          id: '1234',
          frontmatter: { title: 'A title with multiple words' },
          internal: { type: 'Mdx' },
        },
        getNode: () => ({
          sourceInstanceName: 'news',
          relativeDirectory: 'subdir',
        }),
        createNodeId,
        createContentDigest,
      },
      { basePath: 'custom', collection: 'news', fullRelativePath: true }
    );

    // Check that one MdxNode has been created.
    expect(createNode).toHaveBeenCalledTimes(1);
    expect(createNode).toHaveBeenCalledWith({
      id: 'id',
      parent: '1234',
      collection: 'news',
      title: 'A title with multiple words',
      path: '/custom/news/subdir/a-title-with-multiple-words/',
      internal: { type: 'MdxPost', contentDigest: 'digest' },
    });

    // Check that 2 fields have been added to Mdx node.
    expect(createNodeField).toHaveBeenCalledTimes(2);
    expect(createNodeField).toHaveBeenCalledWith({
      node: {
        id: '1234',
        frontmatter: { title: 'A title with multiple words' },
        internal: { type: 'Mdx' },
      },
      name: 'collection',
      value: 'news',
    });
    expect(createNodeField).toHaveBeenCalledWith({
      node: {
        id: '1234',
        frontmatter: { title: 'A title with multiple words' },
        internal: { type: 'Mdx' },
      },
      name: 'path',
      value: '/custom/news/subdir/a-title-with-multiple-words/',
    });
  });
});
