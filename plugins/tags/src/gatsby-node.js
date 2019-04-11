export const createPages = async (
  { graphql, actions },
  { dateFormat = 'MMM D, YYYY', type = 'post', template }
) => {
  const { createPage } = actions;
  const {
    data: {
      allMdx: { nodes: items },
    },
  } = await graphql(
    `
      query($dateFormat: String!, $type: String!) {
        allMdx(
          filter: { fields: { type: { eq: $type } } }
          sort: {
            fields: [frontmatter___date, frontmatter___title]
            order: [DESC, ASC]
          }
        ) {
          nodes {
            fields {
              path
            }
            frontmatter {
              title
              date(formatString: $dateFormat)
              tags
            }
          }
        }
      }
    `,
    { dateFormat, type }
  );

  // For each tag create an array with items that were tagged with this tag.
  const itemsByTags = {};

  items.forEach(({ fields: { path }, frontmatter: { title, date, tags } }) => {
    if (tags) {
      tags.forEach(tag => {
        if (!itemsByTags[tag]) {
          itemsByTags[tag] = [];
        }
        itemsByTags[tag].push({
          title,
          date,
          path,
        });
      });
    }
  });

  // Create tag pages.
  const tags = Object.keys(itemsByTags);
  tags.forEach(tag => {
    const itemsByTag = itemsByTags[tag];
    createPage({
      path: `/${type}s/${tag}`,
      component: template,
      context: {
        values: itemsByTag,
        tag,
      },
    });
  });
};
