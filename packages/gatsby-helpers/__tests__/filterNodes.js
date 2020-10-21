const { filterNodes } = require('../index');

describe('filterNodes', () => {
  it('no nodes', () => {
    const filteredNodes = filterNodes({ allPost: {} });
    expect(filteredNodes).toStrictEqual([]);
  });

  // Standard use case for tags: filter by collection and tag.
  // This is useful when linking to specific tag page.
  it('filter tags', () => {
    const filteredNodes = filterNodes(
      {
        allTag: {
          nodes: [
            {
              id: '25c2116f-1b89-4dc7-98cd-1672dc12abc5',
              collection: 'categories',
              name: 'category1',
              path: '/categories/category1/',
            },
            {
              id: 'b19ff926-9cd2-4409-a7e3-2eb32d99e5f5',
              collection: 'categories',
              name: 'category2',
              path: '/categories/category2/',
            },
            {
              id: 'a7232bde-2be0-4208-b82a-93a1c876ee43',
              collection: 'categories',
              name: 'category3',
              path: '/categories/category3/',
            },
            {
              id: '7e39127d-d829-41a3-b7c8-f21c676cfcf3',
              collection: 'tags',
              name: 'tag1',
              path: '/tags/tag1/',
            },
            {
              id: 'd7cd88b8-bb93-4870-a4cd-86c5d107fa9b',
              collection: 'tags',
              name: 'tag2',
              path: '/tags/tag2/',
            },
            {
              id: '47c9c71e-b049-4af1-820e-68b77506941d',
              collection: 'tags',
              name: 'tag3',
              path: '/tags/tag3/',
            },
          ],
        },
      },
      { collection: 'tags', name: 'tag2' }
    );

    expect(filteredNodes).toStrictEqual([
      {
        id: 'd7cd88b8-bb93-4870-a4cd-86c5d107fa9b',
        collection: 'tags',
        name: 'tag2',
        path: '/tags/tag2/',
      },
    ]);
  });

  // Standard use case for posts: filter all posts with a specific tag.
  // This is useful for related posts.
  it('filter posts', () => {
    const filteredNodes = filterNodes(
      {
        allPost: {
          nodes: [
            {
              id: 'ef53b372-9b6c-46e4-bcbb-347bfe387993',
              title: 'Duis ut proident ut sint esse dolor eu nisi',
              tags: ['dolor', 'nisi'],
            },
            {
              id: '6be464f0-1f37-4537-82dc-57adfbe9c73f',
              title:
                'Qui ad cupidatat irure esse velit sit veniam nisi incididunt',
              tags: ['irure', 'veniam', 'nisi'],
            },
            {
              id: 'b69d6a19-ccc3-42b7-9a1d-dfa0064b09ff',
              title:
                'Sint enim deserunt pariatur non voluptate ad sint incididunt',
              tags: ['voluptate'],
            },
          ],
        },
      },
      ({ tags }) => tags.includes('nisi')
    );

    expect(filteredNodes).toStrictEqual([
      {
        id: 'ef53b372-9b6c-46e4-bcbb-347bfe387993',
        title: 'Duis ut proident ut sint esse dolor eu nisi',
        tags: ['dolor', 'nisi'],
      },
      {
        id: '6be464f0-1f37-4537-82dc-57adfbe9c73f',
        title: 'Qui ad cupidatat irure esse velit sit veniam nisi incididunt',
        tags: ['irure', 'veniam', 'nisi'],
      },
    ]);
  });
});
