# @maiertech/gatsby-theme-blog

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to add a `Post` type to Gatsby sites.

## Options

| Option      | Default       | Description                                                                                                                                                                |
| :---------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| collection  | blog          | The collection is added as field to `Mdx` nodes and `Post` nodes. The base path is `/<collection>`.                                                                        |
| contentPath | content/posts | Location of MDX files with posts. Each post is located in a sub-directory as `index.mdx` together with its assets. The sub-directory name is the post ID and default slug. |

## Frontmatter

| Key         | Required | Description                                                               |
| :---------- | :------- | :------------------------------------------------------------------------ |
| title       | ✓        | Post title, which will be slugified.                                      |
| author      | ✓        | Post author.                                                              |
| date        | ✓        | Date in yyyy-MM-dd format. There is no timezone magic happening anywhere. |
| description |

## Post type

| Field      | Type      | Description                            |
| :--------- | :-------- | :------------------------------------- |
| id         | `ID!`     | Gatsby node GUID.                      |
| collection | `String!` | Collection to which this post belongs. |
| title      | `String!` |                                        |
| author     | `String!` |                                        |
| body       | `String!` | MDX body.                              |
