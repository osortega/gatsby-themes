# @maiertech/gatsby-theme-core

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to add a `Page` type to Gatsby sites.

## Options

| Option                   | Default         | Description                                                                                                                            |
| :----------------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`               | `/`             | Basepath for deployments at locations other than root.                                                                                 |
| `contentPath`            | `content/pages` | Location of MDX files with pages. If pages use images, pages can be placed in a sub-directory as `index.mdx` together with its assets. |
| `fullRelativePath`       | `false`         | Set to `true` to include full path relative to `contentPath` in path of generated pages.                                               |
| `mdxOtherwiseConfigured` | `false`         | Set this flag true if `gatsby-plugin-mdx` is already configured for your site.                                                         |

## Frontmatter

| Key         | Required | Description                          |
| :---------- | :------- | :----------------------------------- |
| title       | ✓        | Post title, which will be slugified. |
| description | ✓        | Description for SEO and previews.    |

## `Page` interface

| Field       | Type      | Description       |
| :---------- | :-------- | :---------------- |
| id          | `ID!`     | Gatsby node GUID. |
| title       | `String!` | From frontmatter. |
| description | `String!` | From frontmatter. |
| body        | `String!` | MDX body.         |
| path        | `String!` | Page path.        |

Type `MdxPage` implements `Page`. If you prefer to use a data source other than
MDX files, you can write a child theme that uses the `Page` interface.
