# @maiertech/gatsby-plugin-blog

This plugin can be used with a Gatsby project or with a
[Gatsby theme](https://www.gatsbyjs.org/docs/themes/). It encapsulates the logic
for programmatically creating post pages.

## Installation

```bash
yarn add @mdotasia/gatsby-plugin-blog
```

## Configuration

Posts reside in a directory that can be configured, e.g. `content/posts`,
referred to as the posts directory. For each post create a subdirectory inside
the posts directory. This plugin uses the following conventions:

- The subdirectory name is the slug, e.g. `my-first-post`.
- The post is an MDX file called `index.mdx`.

Use plugin
[`gatsby-source-filesystem`](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)
to configure the parent directory of the posts directory in the `plugins` array
in `gatsby-config.js`, e.g.

```js
{
  resolve: "gatsby-source-filesystem",
  options: {
    name: 'content',
    path: 'content'
  }
}
```

Add `@maiertech/gatsby-plugin-blog` to `plugins` in `gatsby-config.js`. For the
minimal configuration you need to provide the `template` option, e.g.

```js
{
  resolve: "@mdotasia/gatsby-plugin-blog",
  options: {
    template: `src/templates/post.jsx`
  }
}
```

You can use the following options:

| Option       | Default | Description                                                                                                                                |
| :----------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `pathPrefix` | `""`    | Blog posts are mapped to `/<slug>` by default. If a `pathPrefix` is set, they are mapped to `<pathPrefix>/<slug>`.                         |
| `postsDir`   | `posts` | The default is `posts` in one of your sources defined with `gatsby-source-filesystem`.                                                     |
| `template`   |         | Bring your own template. Template receives `id`, `path` and `context`, which contains `prev` and `next`, which contain `path` and `title`. |

The frontmatter of each post needs to inlcude the following properties, which
are used in the underlying GraphQL query:

| Property | Type         | Description  |
| :------- | :----------- | :----------- |
| `title`  | string       | Post title.  |
| `date`   | `YYYY-MM-DD` | Post date.   |
| `author` | string       | Post author. |
