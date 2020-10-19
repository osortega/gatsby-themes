import { graphql } from 'gatsby';

export const fragment = graphql`
  fragment TaggedItem on Mdx {
    id
    fields {
      collection
      path
    }
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
      datetime: date(formatString: "YYYY-MM-DD")
      description
      tags
    }
  }
`;
