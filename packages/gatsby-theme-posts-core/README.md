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

| Key         | Required | Description                                                                                                                                                                                                                                                                                                 |
| :---------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title       | ✓        | Post title, which will be slugified.                                                                                                                                                                                                                                                                        |
| author      |          | Post author.                                                                                                                                                                                                                                                                                                |
| date        |          | Date in yyyy-MM-dd format. There is no timezone magic happening anywhere. Date is optional in the sense that every posts in a collection should have a date or no post should have a date. If the collection does not have dates, previous and next posts do not make sense, even though they are computed. |
| description | ✓        | Description for SEO and previews (text only).                                                                                                                                                                                                                                                               |
| tags        |          | For full tag support you need to install and configure [`@maiertech/gatsby-theme-tags-core`](https://github.com/maiertech/gatsby-themes/tree/454de6e/issue78/packages/gatsby-theme-tags-core).                                                                                                              |

Author and date are optional to support using this theme to model notes in
[`@maiertech/gatsby-theme-digital-garden`](https://github.com/maiertech/gatsby-themes/tree/master/packages/gatsby-theme-digital-garden).

## `Post` interface

| Field       | Type        | Description                                                                                                                                                |
| :---------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id          | `ID!`       | Gatsby node GUID.                                                                                                                                          |
| collection  | `String!`   | Collection to which this post belongs.                                                                                                                     |
| title       | `String!`   | From frontmatter.                                                                                                                                          |
| author      | `String`    | From frontmatter.                                                                                                                                          |
| date        | `Date`      | From frontmatter.                                                                                                                                          |
| description | `String!`   | From frontmatter.                                                                                                                                          |
| tags        | `[String!]` | From frontmatter.                                                                                                                                          |
| body        | `String!`   | String representation of post body.                                                                                                                        |
| path        | `String!`   | Path to generated page starts with `basePath`, then `collection`, then full relative path if `fullRelativePath` is `true`, then slug derived from `title`. |

Type `MdxPost` implements `Post`. If you prefer to use a data source other than
MDX files, you can write a child theme that implements the `Post` interface.
