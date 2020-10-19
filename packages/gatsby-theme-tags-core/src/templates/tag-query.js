import { graphql } from 'gatsby';

import TagPage from '../components/tag-page';

export default TagPage;

export const query = graphql`
  query($name: String!, $mdxCollections: [String!]!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { collection: { in: $mdxCollections } }
        frontmatter: { tags: { in: [$name] } }
      }
    ) {
      nodes {
        ...TaggedItem
      }
    }
  }
`;
