# @maiertech/gatsby-theme-blog

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to add a `Post` type to Gatsby sites.

## Options

| Option      | Default       | Description                                                                                                                                                                |
| :---------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| collection  | blog          | The collection is added as field to `Mdx` nodes and `Post` nodes. The base path is `/<collection>`.                                                                        |
| contentPath | content/posts | Location of MDX files with posts. Each post is located in a sub-directory as `index.mdx` together with its assets. The sub-directory name is the post ID and default slug. |

## Frontmatter

| Key      | Required | Description                                                                                                                    |
| :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------- |
| title    | ✓        | Post title, which will be slugified.                                                                                           |
| date     | ✓        | Date in yyyy-MM-dd format. This is the date as it should appear on the website. There is no timezone magic happening anywhere. |
| `author` | ✓        | Post author.                                                                                                                   |

## Post type

| Field      | Type      | Description                            |
| :--------- | :-------- | :------------------------------------- |
| id         | `ID!`     | Gatsby node GUID.                      |
| slug       | `ID!`     | Alternate ID.                          |
| collection | `String!` | Collection to which this post belongs. |
| title      | `String!` |                                        |
| author     | `String!` |                                        |
| body       | `String!` | MDX body.                              |
