import { createPages } from '../gatsby-node';

// Result of mock GraphQL query.
const result = [
  {
    fields: {
      type: 'post',
      slug: 'third-post',
      path: '/third-post',
      lead: 'This is the lead of the third post.',
    },
    frontmatter: {
      title: 'Third Post',
      date: '2019-04-08',
    },
  },
  {
    fields: {
      type: 'post',
      slug: 'second-post',
      path: '/second-post',
      lead: 'This is the lead of the second post.',
    },
    frontmatter: {
      title: 'Second Post',
      date: '2019-04-07',
    },
  },
  {
    fields: {
      type: 'post',
      slug: 'first-post',
      path: '/first-post',
      lead: 'This is the lead of the first post.',
    },
    frontmatter: {
      title: 'First Post',
      date: '2019-04-06',
    },
  },
];

describe('createPages', () => {
  // Spy on this function.
  let createPage;
  let actions;

  beforeAll(() => {
    createPage = jest.fn();
    actions = { createPage };
  });

  beforeEach(() => {
    createPage.mockClear();
  });

  test('1 blog post', async () => {
    await createPages(
      {
        graphql: async () => ({
          data: { allMdx: { nodes: result.slice(2, 3) } },
        }),
        actions,
      },
      { template: 'path/to/template' }
    );
    expect(createPage).toHaveBeenCalledTimes(1);
    expect(createPage).toHaveBeenCalledWith({
      path: '/first-post',
      component: 'path/to/template',
      context: { next: null, prev: null },
    });
  });

  test('2 blog posts', async () => {
    await createPages(
      {
        graphql: async () => ({
          data: { allMdx: { nodes: result.slice(1, 3) } },
        }),
        actions,
      },
      { template: 'path/to/template' }
    );
    expect(createPage).toHaveBeenCalledTimes(2);
    expect(createPage).toHaveBeenNthCalledWith(1, {
      path: '/second-post',
      component: 'path/to/template',
      context: {
        next: null,
        prev: {
          path: '/first-post',
          title: 'First Post',
        },
      },
    });
    expect(createPage).toHaveBeenNthCalledWith(2, {
      path: '/first-post',
      component: 'path/to/template',
      context: {
        next: {
          path: '/second-post',
          title: 'Second Post',
        },
        prev: null,
      },
    });
  });

  test('3 blog posts', async () => {
    await createPages(
      {
        graphql: async () => ({
          data: { allMdx: { nodes: result.slice(0, 3) } },
        }),
        actions,
      },
      { template: 'path/to/template' }
    );
    expect(createPage).toHaveBeenCalledTimes(3);
    expect(createPage).toHaveBeenNthCalledWith(1, {
      path: '/third-post',
      component: 'path/to/template',
      context: {
        next: null,
        prev: {
          path: '/second-post',
          title: 'Second Post',
        },
      },
    });
    expect(createPage).toHaveBeenNthCalledWith(2, {
      path: '/second-post',
      component: 'path/to/template',
      context: {
        next: {
          path: '/third-post',
          title: 'Third Post',
        },
        prev: {
          path: '/first-post',
          title: 'First Post',
        },
      },
    });
    expect(createPage).toHaveBeenNthCalledWith(3, {
      path: '/first-post',
      component: 'path/to/template',
      context: {
        next: {
          path: '/second-post',
          title: 'Second Post',
        },
        prev: null,
      },
    });
  });
});
