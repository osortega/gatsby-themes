import { graphql } from 'gatsby';

import Page from './page';

export default Page;

export const query = graphql`
  query($id: String) {
    page(id: { eq: $id }) {
      ...PageFragment
    }
  }
`;
