# @maiertech/gatsby-plugin-tags

This plugin can be used with a Gatsby project or with a
[Gatsby theme](https://www.gatsbyjs.org/docs/themes/). It encapsulates the logic
for programmatically creating tag pages.

## Installation

```bash
yarn add @maiertech/gatsby-plugin-tags
```

## Configuration

You can only tag pages of type `Mdx`. Plugin options:

| Option       | Default       | Description                                                                                                                                                                                                                                                       |
| :----------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dateFormat` | `MMM D, YYYY` | Date format for tagged items.                                                                                                                                                                                                                                     |
| `type`       | `post`        | Type of `Mdx` pages for which tag pages are created. Another plugin such as [`@maiertech/gatsby-plugin-blog`](https://github.com/maiertech/gatsby-themes/tree/master/plugins/blog) creates field `type`, e.g. post. The `path` for a tag page is `<type>s/<tag>`. |
| `template`   |               | Bring your own template. Template receives `path` and `context`, which contains `values` and `tag`. `values` contains all items tagged with `tag` and sorted chronologically (latest item first).                                                                 |

Add `@maiertech/gatsby-plugin-tags` to your `plugins` array in `gatsby-node.js`:

```js
{
  resolve: "@maiertech/gatsby-plugin-tags",
  options: {
    type: 'post'
    template: 'src/templates/tag.jsx',
  }
}
```

You can create multiple sets of tag pages for different types. Add one
configuration per type. Here is another configuration:

```js
{
  resolve: "@maiertech/gatsby-plugin-tags",
  options: {
    dateFormat: 'D MMM YYYY'
    type: 'video'
    template: 'src/templates/tag.jsx',
  }
}
```

The frontmatter of each item to be tagged needs to include the following
properties:

| Property | Type             | Description |
| :------- | :--------------- | :---------- |
| `date`   | `YYYY-MM-DD`     | Item date.  |
| `tags`   | array of strings | Item tags.  |
| `title`  | string           | Item title. |
