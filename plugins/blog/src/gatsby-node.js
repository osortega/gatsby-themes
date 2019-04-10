export const onCreateNode = (
  { node, getNode, actions },
  { pathPrefix = '', postsDir = 'posts' }
) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const { relativePath } = getNode(node.parent);
    if (relativePath.startsWith(postsDir)) {
      // Mark node as post.
      createNodeField({
        node,
        name: 'type',
        value: 'post',
      });

      // Derive slug from relative path: <postsDir>/slug/index.mdx => slug.
      // Match result: ["<pathPrefix>/slug/", "slug"].
      // Optional: overwrite slug in frontmatter.
      const slug = node.frontmatter.slug || /.*\/(.*)\//.exec(relativePath)[1];

      // Type and slug combo identifies content in template queries for programmatic page generation.
      createNodeField({
        node,
        name: 'slug',
        value: slug,
      });

      createNodeField({
        node,
        name: 'path',
        value: `${pathPrefix}/${slug}`,
      });

      // If no lead is provided derive it from rawBody.
      const lead =
        node.frontmatter.lead || node.rawBody.match(/\n\n(.+)\n\n/)[1];

      createNodeField({
        node,
        name: 'lead',
        value: lead,
      });
    }
  }
};

// Create blog post pages.
export const createPages = async ({ graphql, actions }, { template }) => {
  const { createPage } = actions;

  // Read all posts sorted by date desc and for each post determine prev and next post.
  const {
    data: {
      allMdx: { nodes: posts },
    },
  } = await graphql(`
    {
      allMdx(
        filter: { fields: { type: { eq: "post" } } }
        sort: {
          fields: [frontmatter___date, frontmatter___title]
          order: [DESC, ASC]
        }
      ) {
        nodes {
          id
          fields {
            path
          }
          frontmatter {
            title
          }
        }
      }
    }
  `);

  posts.forEach(({ fields: { path } }, index) => {
    // Determine prev and next  posts. If none exists, set to null.
    let prev = index === posts.length - 1 ? null : posts[index + 1];
    if (prev) {
      const {
        fields: { path: prevPath, date },
        frontmatter: { title },
      } = prev;
      prev = { date, path: prevPath, title };
    }
    let next = index === 0 ? null : posts[index - 1];
    if (next) {
      const {
        fields: { path: nextPath, date },
        frontmatter: { title },
      } = next;
      next = { date, path: nextPath, title };
    }
    // Template uses `path` to query page data.
    createPage({
      path,
      component: template,
      context: {
        prev,
        next,
      },
    });
  });
};
