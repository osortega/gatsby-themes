const { createPages } = require('../gatsby-node');

describe('createPages', () => {
  let createPage;
  let actions;
  let reporter;

  beforeAll(() => {
    // Create spies.
    createPage = jest.fn();
    actions = { createPage };
    reporter = jest.fn();
  });

  beforeEach(() => {
    // Clear spies before each test.
    createPage.mockClear();
    reporter.mockClear();
  });

  it('generate tag pages', async () => {
    await createPages(
      {
        actions,
        graphql: () => ({
          data: {
            allTag: {
              nodes: [
                {
                  name: 'tag1',
                  path: '/tags/tag1/',
                },
                {
                  name: 'tag2',
                  path: '/tags/tag2/',
                },
                { name: 'tag3', path: '/tags/tag3/' },
              ],
            },
          },
        }),
        reporter,
      },
      { mdxCollections: ['posts'] }
    );

    // 1 call for tags page and 3 calls for tag pages.
    expect(createPage).toHaveBeenCalledTimes(4);

    // No errors.
    expect(reporter).not.toHaveBeenCalled();

    // Tags page.
    expect(createPage).toHaveBeenCalledWith({
      path: '/tags/',
      component: require.resolve('../src/templates/tags-query.js'),
      context: {
        collection: 'tags',
        // Default options.
        themeOptions: {
          basePath: '/',
          tagCollection: 'tags',
          mdxCollections: ['posts'],
        },
      },
    });

    // Tag page for `tag1`.
    expect(createPage).toHaveBeenCalledWith({
      path: '/tags/tag1/',
      component: require.resolve('../src/templates/tag-query.js'),
      context: {
        mdxCollections: ['posts'],
        name: 'tag1',
        themeOptions: {
          basePath: '/',
          tagCollection: 'tags',
          mdxCollections: ['posts'],
        },
      },
    });

    // Tag page for `tag2`.
    expect(createPage).toHaveBeenCalledWith({
      path: '/tags/tag2/',
      component: require.resolve('../src/templates/tag-query.js'),
      context: {
        mdxCollections: ['posts'],
        name: 'tag2',
        themeOptions: {
          basePath: '/',
          tagCollection: 'tags',
          mdxCollections: ['posts'],
        },
      },
    });

    // Tag page for `tag3`.
    expect(createPage).toHaveBeenCalledWith({
      path: '/tags/tag3/',
      component: require.resolve('../src/templates/tag-query.js'),
      context: {
        mdxCollections: ['posts'],
        name: 'tag3',
        themeOptions: {
          basePath: '/',
          tagCollection: 'tags',
          mdxCollections: ['posts'],
        },
      },
    });
  });

  // Testing with a custom `basePath` makes no sense sicne we mock `graphql`.

  it('there are no tags', async () => {
    await createPages(
      {
        actions,
        graphql: () => ({
          data: {
            allTag: {
              nodes: [],
            },
          },
        }),
        reporter,
      },
      { mdxCollections: ['posts'] }
    );

    expect(createPage).toHaveBeenCalledTimes(1);

    // Tags page.
    expect(createPage).toHaveBeenCalledWith({
      path: '/tags/',
      component: require.resolve('../src/templates/tags-query.js'),
      context: {
        collection: 'tags',
        // Default options.
        themeOptions: {
          basePath: '/',
          tagCollection: 'tags',
          mdxCollections: ['posts'],
        },
      },
    });
  });
});
