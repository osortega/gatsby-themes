import { graphql } from 'gatsby';

import TagPage from '../components/tag-page';

export default TagPage;

export const query = graphql`
  query($tag: String!, $mdxCollections: [String!]!) {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        fields: { collection: { in: $mdxCollections } }
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      nodes {
        ...TaggedItem
      }
    }
  }
`;
