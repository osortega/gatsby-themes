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
    // Reset spies.
    createPage.mockClear();
    reporter.mockClear();
  });

  it('generate post pages', async () => {
    await createPages({
      actions,
      graphql: () => ({
        data: {
          allPost: {
            nodes: [
              { id: '3', path: '/posts/third-post/' },
              { id: '2', path: '/posts/second-post/' },
              { id: '1', path: '/posts/first-post/' },
            ],
          },
        },
      }),
      reporter,
    });

    // Check that posts page and 3 post pages have been created.
    expect(createPage).toHaveBeenCalledTimes(4);

    // Posts page.
    expect(createPage).toHaveBeenCalledWith({
      path: '/posts/',
      component: require.resolve('../src/templates/posts-query.js'),
      context: {
        collection: 'posts',
        themeOptions: {
          basePath: '/',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // First post.
    expect(createPage).toHaveBeenCalledWith({
      path: '/posts/first-post/',
      component: require.resolve('../src/templates/post-query.js'),
      context: {
        id: '1',
        prev: '2',
        next: null,
        themeOptions: {
          basePath: '/',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Second post.
    expect(createPage).toHaveBeenCalledWith({
      path: '/posts/second-post/',
      component: require.resolve('../src/templates/post-query.js'),
      context: {
        id: '2',
        prev: '3',
        next: '1',
        themeOptions: {
          basePath: '/',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Third post.
    expect(createPage).toHaveBeenCalledWith({
      path: '/posts/third-post/',
      component: require.resolve('../src/templates/post-query.js'),
      context: {
        id: '3',
        prev: null,
        next: '2',
        themeOptions: {
          basePath: '/',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });
  });

  it('generate post pages with custom options', async () => {
    await createPages(
      {
        actions,
        graphql: () => ({
          data: {
            allPost: {
              nodes: [
                { id: '3', path: '/custom/posts/third-post/' },
                { id: '2', path: '/custom/posts/second-post/' },
                { id: '1', path: '/custom/posts/first-post/' },
              ],
            },
          },
        }),
        reporter,
      },
      { basePath: '/custom' }
    );

    // Check that posts page and 3 post pages have been created.
    expect(createPage).toHaveBeenCalledTimes(4);

    // Posts page.
    expect(createPage).toHaveBeenCalledWith({
      path: '/custom/posts/',
      component: require.resolve('../src/templates/posts-query.js'),
      context: {
        collection: 'posts',
        themeOptions: {
          basePath: '/custom',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // First post.
    expect(createPage).toHaveBeenCalledWith({
      path: '/custom/posts/first-post/',
      component: require.resolve('../src/templates/post-query.js'),
      context: {
        id: '1',
        prev: '2',
        next: null,
        themeOptions: {
          basePath: '/custom',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Second post.
    expect(createPage).toHaveBeenCalledWith({
      path: '/custom/posts/second-post/',
      component: require.resolve('../src/templates/post-query.js'),
      context: {
        id: '2',
        prev: '3',
        next: '1',
        themeOptions: {
          basePath: '/custom',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Third post.
    expect(createPage).toHaveBeenCalledWith({
      path: '/custom/posts/third-post/',
      component: require.resolve('../src/templates/post-query.js'),
      context: {
        id: '3',
        prev: null,
        next: '2',
        themeOptions: {
          basePath: '/custom',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });
  });
});
