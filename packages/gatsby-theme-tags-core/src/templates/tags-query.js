import { graphql } from 'gatsby';

import TagsPage from '../components/tags-page';

export default TagsPage;

export const query = graphql`
  query($collection: String!) {
    allTag(
      sort: { fields: name, order: ASC }
      filter: { collection: { eq: $collection } }
    ) {
      nodes {
        ...TagFragment
      }
    }
  }
`;
