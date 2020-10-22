# @maiertech/gatsby-theme-tags-core

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to add a `Tag` interface and `MdxTag` type to Gatsby sites.

## Options

| Option           | Default | Description                                                                                                                                                       |
| :--------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`       | `/`     | Basepath for deployments at locations other than root.                                                                                                            |
| `tagCollection`  | tags    | The tag collection is added to `Tag` nodes. It is also part of the path.                                                                                          |
| `mdxCollections` | `[]`    | Array of collections from which the theme collects tags. The theme looks at the `collection` field of `Mdx` nodes. If array is empty, no tag pages are generated. |

## Frontmatter

This table refers to the frontmatter keys required in tagged MDX pages:

| Key         | Required | Description                                                               |
| :---------- | :------- | :------------------------------------------------------------------------ |
| title       | ✓        |                                                                           |
| date        | ✓        | Date in yyyy-MM-dd format. There is no timezone magic happening anywhere. |
| description | ✓        | For SEO and preview                                                       |
| tags        |          | Array of tags.                                                            |

## Fields

This table shows the fields required in tagged MDX pages:

| Field      | Required | Description                         |
| :--------- | :------- | :---------------------------------- |
| collection | ✓        | Collection to which a node belongs. |
| path       | ✓        | Path to generated page.             |

## `Tag` type

| Field | Type      | Description                                                                                         |
| :---- | :-------- | :-------------------------------------------------------------------------------------------------- |
| id    | `ID!`     | Gatsby node GUID.                                                                                   |
| name  | `String!` | Tag name.                                                                                           |
| path  | `String!` | Path to generated tag page starts with `basePath`, then `tagCollection`, then the slugified `name`. |
