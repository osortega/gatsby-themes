const { createPath } = require('../index');

describe('createPath', () => {
  it('1 segment', () => {
    expect(createPath('posts')).toBe('/posts/');
  });

  it('2 segments', () => {
    expect(createPath('posts', 'slug')).toBe('/posts/slug/');
  });

  it('empty middle segment', () => {
    expect(createPath('posts', '', 'slug')).toBe('/posts/slug/');
  });
});
