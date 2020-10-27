const { onCreateNode } = require('../gatsby-node');

describe('onCreateNode', () => {
  let actions;
  let createNodeId;
  let createContentDigest;
  let getNode;

  beforeAll(() => {
    // Create spies.
    getNode = jest.fn();
    actions = { createNode: jest.fn(), createNodeField: jest.fn() };

    // Create mocks.
    createNodeId = () => 'id';
    createContentDigest = () => 'digest';
  });

  beforeEach(() => {
    // Clear spies before each test.
    actions.createNode.mockClear();
    actions.createNodeField.mockClear();
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
    expect(actions.createNode).not.toHaveBeenCalled();
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
    expect(actions.createNode).not.toHaveBeenCalled();
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
    expect(actions.createNode).toHaveBeenCalledTimes(1);
    expect(actions.createNode).toHaveBeenCalledWith({
      id: 'id',
      parent: '1234',
      collection: 'posts',
      title: 'A title with multiple words',
      path: '/posts/a-title-with-multiple-words/',
      internal: { type: 'MdxPost', contentDigest: 'digest' },
    });

    // Check that 2 fields have been added to Mdx node.
    expect(actions.createNodeField).toHaveBeenCalledTimes(2);
    expect(actions.createNodeField).toHaveBeenCalledWith({
      node: {
        id: '1234',
        frontmatter: { title: 'A title with multiple words' },
        internal: { type: 'Mdx' },
      },
      name: 'collection',
      value: 'posts',
    });
    expect(actions.createNodeField).toHaveBeenCalledWith({
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
    expect(actions.createNode).toHaveBeenCalledTimes(1);
    expect(actions.createNode).toHaveBeenCalledWith({
      id: 'id',
      parent: '1234',
      collection: 'news',
      title: 'A title with multiple words',
      path: '/custom/news/subdir/a-title-with-multiple-words/',
      internal: { type: 'MdxPost', contentDigest: 'digest' },
    });

    // Check that 2 fields have been added to Mdx node.
    expect(actions.createNodeField).toHaveBeenCalledTimes(2);
    expect(actions.createNodeField).toHaveBeenCalledWith({
      node: {
        id: '1234',
        frontmatter: { title: 'A title with multiple words' },
        internal: { type: 'Mdx' },
      },
      name: 'collection',
      value: 'news',
    });
    expect(actions.createNodeField).toHaveBeenCalledWith({
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
