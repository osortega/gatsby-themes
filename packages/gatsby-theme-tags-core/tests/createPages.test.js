const { createPages } = require('../gatsby-node');

describe('createPages', () => {
  let actions;
  let reporter;

  beforeAll(() => {
    // Create spies.
    actions = { createPage: jest.fn() };
    reporter = { error: jest.fn() };
  });

  beforeEach(() => {
    // Clear spies before each test.
    actions.createPage.mockClear();
    reporter.error.mockClear();
  });

  it('tags exist', async () => {
    await createPages(
      {
        actions,
        graphql: () => ({
          data: {
            allMdx: {
              group: [
                {
                  tag: 'tag1',
                  count: 5,
                },
                {
                  tag: 'tag2',
                  count: 1,
                },
                {
                  tag: 'tag3',
                  count: 2,
                },
              ],
            },
          },
        }),
        reporter,
      },
      { mdxCollections: ['posts'] }
    );

    expect(reporter.error).not.toHaveBeenCalled();

    // 1 call for tags page and 3 calls for tag pages.
    expect(actions.createPage).toHaveBeenCalledTimes(4);

    // Tags page.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/tags/',
      component: require.resolve('../src/templates/tags-query.js'),
      context: {
        tags: [
          {
            tag: 'tag1',
            count: 5,
            path: '/tags/tag1/',
          },
          {
            tag: 'tag2',
            count: 1,
            path: '/tags/tag2/',
          },
          {
            tag: 'tag3',
            count: 2,
            path: '/tags/tag3/',
          },
        ],
        themeOptions: {
          basePath: '/',
          tagCollection: 'tags',
          mdxCollections: ['posts'],
        },
      },
    });

    // Tag page for `tag1`.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/tags/tag1/',
      component: require.resolve('../src/templates/tag-query.js'),
      context: {
        tag: 'tag1',
        mdxCollections: ['posts'],
        themeOptions: {
          basePath: '/',
          tagCollection: 'tags',
          mdxCollections: ['posts'],
        },
      },
    });

    // Tag page for `tag2`.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/tags/tag2/',
      component: require.resolve('../src/templates/tag-query.js'),
      context: {
        tag: 'tag2',
        mdxCollections: ['posts'],
        themeOptions: {
          basePath: '/',
          tagCollection: 'tags',
          mdxCollections: ['posts'],
        },
      },
    });

    // Tag page for `tag3`.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/tags/tag3/',
      component: require.resolve('../src/templates/tag-query.js'),
      context: {
        tag: 'tag3',
        mdxCollections: ['posts'],
        themeOptions: {
          basePath: '/',
          tagCollection: 'tags',
          mdxCollections: ['posts'],
        },
      },
    });
  });

  // Testing with a custom `basePath` makes no sense sicne we mock `graphql`.

  it('no tags exist', async () => {
    await createPages(
      {
        actions,
        graphql: () => ({
          data: {
            allMdx: {
              group: [],
            },
          },
        }),
        reporter,
      },
      { mdxCollections: ['posts'] }
    );

    expect(reporter.error).not.toHaveBeenCalled();

    expect(actions.createPage).toHaveBeenCalledTimes(1);

    // Tags page.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/tags/',
      component: require.resolve('../src/templates/tags-query.js'),
      context: {
        tags: [],
        themeOptions: {
          basePath: '/',
          tagCollection: 'tags',
          mdxCollections: ['posts'],
        },
      },
    });
  });

  it('error', async () => {
    await createPages(
      { actions, graphql: () => ({ errors: true }), reporter },
      { mdxCollections: ['posts', 'news'] }
    );

    expect(reporter.error).toHaveBeenCalledTimes(1);
    expect(reporter.error).toHaveBeenCalledWith(
      'There was an error fetching all tags from these collections: posts,news.',
      true
    );
  });
});
