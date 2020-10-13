import { createPages } from '../gatsby-node';

const result = [
  {
    fields: {
      path: '/third-post',
    },
    frontmatter: {
      title: 'Third Post',
      date: 'Apr 11, 2019',
      tags: ['blue', 'green', 'yellow'],
    },
  },
  {
    fields: {
      path: '/second-post',
    },
    frontmatter: {
      title: 'Second Post',
      date: 'Apr 10, 2019',
      tags: ['blue', 'green'],
    },
  },
  {
    fields: {
      path: '/first-post',
    },
    frontmatter: {
      title: 'First Post',
      date: 'Apr 09, 2019',
      tags: ['blue'],
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

  it('default options', async () => {
    await createPages(
      {
        graphql: () => ({
          data: { allMdx: { nodes: result } },
        }),
        actions,
      },
      { template: 'path/to/template' }
    );
    expect(createPage).toHaveBeenCalledTimes(3);
    // Order of createPage calls is unspecified due to use of Object.keys.
    // Use HaveBeenCalledWith instead of HaveBeenNthCalledWith.
    expect(createPage).toHaveBeenCalledWith({
      path: '/posts/blue',
      component: 'path/to/template',
      context: {
        values: [
          {
            title: 'Third Post',
            date: 'Apr 11, 2019',
            path: '/third-post',
          },
          {
            title: 'Second Post',
            date: 'Apr 10, 2019',
            path: '/second-post',
          },
          {
            title: 'First Post',
            date: 'Apr 09, 2019',
            path: '/first-post',
          },
        ],
        tag: 'blue',
      },
    });
    expect(createPage).toHaveBeenCalledWith({
      path: '/posts/green',
      component: 'path/to/template',
      context: {
        values: [
          {
            title: 'Third Post',
            date: 'Apr 11, 2019',
            path: '/third-post',
          },
          {
            title: 'Second Post',
            date: 'Apr 10, 2019',
            path: '/second-post',
          },
        ],
        tag: 'green',
      },
    });
    expect(createPage).toHaveBeenCalledWith({
      path: '/posts/yellow',
      component: 'path/to/template',
      context: {
        values: [
          {
            title: 'Third Post',
            date: 'Apr 11, 2019',
            path: '/third-post',
          },
        ],
        tag: 'yellow',
      },
    });
  });

  it('custom type', async () => {
    await createPages(
      {
        graphql: () => ({
          data: {
            allMdx: {
              nodes: [
                {
                  fields: {
                    path: '/boring-session',
                  },
                  frontmatter: {
                    title: 'Boring Session',
                    date: 'Apr 11, 2019',
                    tags: ['dull'],
                  },
                },
              ],
            },
          },
        }),
        actions,
      },
      { template: 'path/to/template', type: 'session' }
    );
    expect(createPage).toHaveBeenCalledTimes(1);
    expect(createPage).toHaveBeenCalledWith({
      path: '/sessions/dull',
      component: 'path/to/template',
      context: {
        values: [
          {
            title: 'Boring Session',
            date: 'Apr 11, 2019',
            path: '/boring-session',
          },
        ],
        tag: 'dull',
      },
    });
  });

  it('no item has tags', async () => {
    // Remove tags from posts.
    await createPages(
      {
        graphql: () => ({
          data: {
            allMdx: {
              nodes: result.map(
                // eslint-disable-next-line no-unused-vars
                ({ fields, frontmatter: { tags, ...rest } }) => ({
                  fields,
                  frontmatter: { ...rest },
                })
              ),
            },
          },
        }),
        actions,
      },
      { template: 'path/to/template', type: 'posts' }
    );
    expect(createPage).toHaveBeenCalledTimes(0);
  });
});
