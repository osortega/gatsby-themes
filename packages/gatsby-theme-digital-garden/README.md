# @maiertech/gatsby-theme-digital-garden

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to create a [digital garden](https://joelhooks.com/digital-garden).

This theme is opinionated in terms of the data model and styling. If it does not
match your use case, you can use my core themes and your preferred styling to
compose your own digital garden.

## Notes

A note is the most basic unit of information in my digital garden. It is an MDX
page that is located in a folder structure. It uses the following frontmatter
fields:

| Field       | Required | Description                                                  |
| :---------- | :------- | :----------------------------------------------------------- |
| title       | ✓        |                                                              |
| description | ✓        | A brief description of what the note is about.               |
| tags        | ✓        | One or more tags are required to be able to discover a note. |

A note does not have a date, because a note is a raw and unpolished type of
content. Most notes will receive occasional updates, but will essentially never
go anywhere. Some notes on which I make a few iterations will graduate to a
post.

## Posts

A post adds `author` and `date` fields. It is the result of several iterations
on a note and is more polished than a note. You can think of its date as the
graduation date from notes academy.
