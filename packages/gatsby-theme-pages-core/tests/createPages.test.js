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

    // Check that 3 post pages have been created.
    expect(createPage).toHaveBeenCalledTimes(3);

    // About page.
    expect(createPage).toHaveBeenCalledWith({
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
    expect(createPage).toHaveBeenCalledWith({
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
    expect(createPage).toHaveBeenCalledWith({
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

  // No need to test custom options since they are only being passed through to template.
});
