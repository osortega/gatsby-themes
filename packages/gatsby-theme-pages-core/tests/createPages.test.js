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
    // Reset spies.
    actions.createPage.mockClear();
    reporter.error.mockClear();
  });

  it('generate pages', async () => {
    await createPages({
      actions,
      graphql: () => ({
        data: {
          allPage: {
            nodes: [
              { id: '1', path: '/about/' },
              { id: '2', path: '/privacy-policy/' },
              { id: '3', path: '/terms/' },
            ],
          },
        },
      }),
      reporter,
    });

    expect(reporter.error).not.toHaveBeenCalled();

    // Check that 3 post pages have been created.
    expect(actions.createPage).toHaveBeenCalledTimes(3);

    // About page.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/about/',
      component: require.resolve('../src/template.js'),
      context: {
        id: '1',
        themeOptions: {
          basePath: '/',
          contentPath: 'content/pages',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Privacy policy page.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/privacy-policy/',
      component: require.resolve('../src/template.js'),
      context: {
        id: '2',
        themeOptions: {
          basePath: '/',
          contentPath: 'content/pages',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Terms page.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/terms/',
      component: require.resolve('../src/template.js'),
      context: {
        id: '3',
        themeOptions: {
          basePath: '/',
          contentPath: 'content/pages',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });
  });

  it('error', async () => {
    await createPages({
      actions,
      graphql: () => ({ errors: true }),
      reporter,
    });

    expect(reporter.error).toHaveBeenCalledTimes(1);
    expect(reporter.error).toHaveBeenCalledWith(
      'There was an error fetching pages.',
      true
    );
  });

  // No need to test custom options since they are only being passed through to template.
});
