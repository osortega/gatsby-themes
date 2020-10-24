# @maiertech/gatsby-theme-posts-core

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to add a `Post` interface and `MdxPost` type to Gatsby sites.

## Options

| Option                   | Default         | Description                                                                                                                 |
| :----------------------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `basePath`               | `/`             | Basepath for deployments at locations other than root.                                                                      |
| `collection`             | `posts`         | The collection is added to `Post` nodes and as field to the underlying `Mdx` node. It is also part of the path.             |
| `contentPath`            | `content/posts` | Location of post MDX files and assets. You can organize them in whichever way you want, e.g. place them in sub-directories. |
| `fullRelativePath`       | `false`         | When set to `true`, include full path relative to `contentPath` in path of generated posts.                                 |
| `mdxOtherwiseConfigured` | `false`         | Set this flag true if `gatsby-plugin-mdx` is already configured for your site.                                              |

## Frontmatter

| Key         | Required | Description                                                               |
| :---------- | :------- | :------------------------------------------------------------------------ |
| title       | ✓        | Post title, which will be slugified.                                      |
| author      | ✓        | Post author.                                                              |
| date        | ✓        | Date in yyyy-MM-dd format. There is no timezone magic happening anywhere. |
| description | ✓        | Description for SEO and previews (text only).                             |

## `Post` interface

| Field       | Type      | Description                                                                                                                                                |
| :---------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id          | `ID!`     | Gatsby node GUID.                                                                                                                                          |
| collection  | `String!` | Collection to which this post belongs.                                                                                                                     |
| title       | `String!` | From frontmatter.                                                                                                                                          |
| author      | `String!` | From frontmatter.                                                                                                                                          |
| date        | `Date!`   | From frontmatter.                                                                                                                                          |
| description | `String!` | From frontmatter.                                                                                                                                          |
| body        | `String!` | String representation of post body.                                                                                                                        |
| path        | `String!` | Path to generated page starts with `basePath`, then `collection`, then full relative path if `fullRelativePath` is `true`, then slug derived from `title`. |

Type `MdxPost` implements `Post`. If you prefer to use a data source other than
MDX files, you can write a child theme that implements the `Post` interface.
