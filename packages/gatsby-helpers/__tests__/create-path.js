const { createPath } = require('../index');

describe('createPath', () => {
  it.todo('1 segment');

  it('2 segments', () => {
    expect(createPath('blog', 'slug')).toBe('/blog/slug/');
  });

  it('empty middle segment', () => {
    expect(createPath('blog', '', 'slug')).toBe('/blog/slug/');
  });
});
