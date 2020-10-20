# @maiertech/gatsby-theme-posts-core

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to add a `Post` type to Gatsby sites.

## Options

| Option             | Default         | Description                                                                                                                                                                |
| :----------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`         | `/`             | Basepath for deployments at locations other than root.                                                                                                                     |
| `collection`       | `posts`         | The collection is added as field to `Post` nodes. The basepath is `/<collection>`.                                                                                         |
| `contentPath`      | `content/posts` | Location of MDX files with posts. Each post is located in a sub-directory as `index.mdx` together with its assets. The sub-directory name is the post ID and default slug. |
| `fullRelativePath` | `false`         | Set to `true` to include full path relative to `contentPath` in path of generated posts.                                                                                   |

## Frontmatter

| Key         | Required | Description                                                               |
| :---------- | :------- | :------------------------------------------------------------------------ |
| title       | ✓        | Post title, which will be slugified.                                      |
| author      | ✓        | Post author.                                                              |
| date        | ✓        | Date in yyyy-MM-dd format. There is no timezone magic happening anywhere. |
| description | ✓        | Description for SEO and previews.                                         |

## `Post` interface

| Field       | Type      | Description                            |
| :---------- | :-------- | :------------------------------------- |
| id          | `ID!`     | Gatsby node GUID.                      |
| collection  | `String!` | Collection to which this post belongs. |
| title       | `String!` | From frontmatter.                      |
| author      | `String!` | From frontmatter.                      |
| date        | `Date!`   | From frontmatter.                      |
| description | `String!` | From frontmatter.                      |
| body        | `String!` | MDX body.                              |
| path        | `String!` | Page path.                             |

Type `MdxPost` implements `Post`. If you prefer to use a data source other than
MDX files, you can let that data source implement `Post` for full compatibility.
