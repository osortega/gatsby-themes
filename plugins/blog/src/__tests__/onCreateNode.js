import { onCreateNode } from '../gatsby-node';

// First paragraph in rawBody is enclosed by `\n\n`.
const node = {
  internal: { type: 'Mdx' },
  frontmatter: { date: '2019-04-08' },
  rawBody: `\n\nEsse cillum dolore eu fugiat nulla pariatur. Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Totam rem aperiam. Et harum quidem rerum facilis est et expedita distinctio. At vero eos et accusamus.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem. Cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia. Fugiat quo voluptas nulla pariatur? Itaque earum rerum hic tenetur a sapiente delectus.`,
};

const getNode = () => ({ relativePath: 'posts/this-is-the-slug/index.mdx' });

describe('onCreateNode', () => {
  // Spy on this function.
  let createNodeField;
  let actions;

  beforeAll(() => {
    createNodeField = jest.fn();
    actions = { createNodeField };
  });

  beforeEach(() => {
    createNodeField.mockClear();
  });

  test('default options', () => {
    onCreateNode({ node, getNode, actions }, {});

    // Type.
    expect(createNodeField).toHaveBeenNthCalledWith(1, {
      node,
      name: 'type',
      value: 'post',
    });

    // Slug.
    expect(createNodeField).toHaveBeenNthCalledWith(2, {
      node,
      name: 'slug',
      value: 'this-is-the-slug',
    });

    // Path.
    expect(createNodeField).toHaveBeenNthCalledWith(3, {
      node,
      name: 'path',
      value: '/this-is-the-slug',
    });

    // Lead.
    expect(createNodeField).toHaveBeenNthCalledWith(4, {
      node,
      name: 'lead',
      value:
        'Esse cillum dolore eu fugiat nulla pariatur. Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Totam rem aperiam. Et harum quidem rerum facilis est et expedita distinctio. At vero eos et accusamus.',
    });
  });

  test('overwrite slug in frontmatter', () => {
    const { frontmatter, ...rest } = node;
    const nodeWithSlugOverwritten = {
      ...rest,
      frontmatter: { ...frontmatter, slug: 'this-is-the-overwritten-slug' },
    };

    onCreateNode({ node: nodeWithSlugOverwritten, getNode, actions }, {});

    expect(createNodeField).toHaveBeenNthCalledWith(2, {
      node: nodeWithSlugOverwritten,
      name: 'slug',
      value: 'this-is-the-overwritten-slug',
    });
  });

  test('overwrite lead in frontmatter', () => {
    const { frontmatter, ...rest } = node;
    const nodeWithLeadOverwritten = {
      ...rest,
      frontmatter: { ...frontmatter, lead: 'This is the overwritten lead.' },
    };

    onCreateNode({ node: nodeWithLeadOverwritten, getNode, actions }, {});

    expect(createNodeField).toHaveBeenNthCalledWith(4, {
      node: nodeWithLeadOverwritten,
      name: 'lead',
      value: 'This is the overwritten lead.',
    });
  });

  test('custom pathPrefix', () => {
    onCreateNode({ node, getNode, actions }, { pathPrefix: '/blog' });

    expect(createNodeField).toHaveBeenNthCalledWith(3, {
      node,
      name: 'path',
      value: '/blog/this-is-the-slug',
    });
  });

  test('custom postsDir', () => {
    onCreateNode(
      {
        node,
        getNode: () => ({ relativePath: 'blog/this-is-the-slug/index.mdx' }),
        actions,
      },
      { postsDir: 'blog' }
    );

    expect(createNodeField).toHaveBeenNthCalledWith(3, {
      node,
      name: 'path',
      value: '/this-is-the-slug',
    });
  });

  test('pagesDir does not match', () => {
    onCreateNode(
      {
        node,
        getNode: () => ({ relativePath: 'mismatch/path/index.mdx' }),
        actions,
      },
      {}
    );
    expect(createNodeField).toHaveBeenCalledTimes(0);
  });

  test('not type Mdx', () => {
    onCreateNode({ node: { internal: { type: 'NotMdx' } }, actions }, {});
    expect(createNodeField).toHaveBeenCalledTimes(0);
  });
});
