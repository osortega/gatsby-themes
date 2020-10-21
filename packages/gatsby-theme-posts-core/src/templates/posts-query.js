import { graphql } from 'gatsby';

import PostsPage from '../components/posts-page';

export default PostsPage;

export const query = graphql`
  query($collection: String!) {
    allPost(
      sort: { fields: [date, title], order: [DESC, ASC] }
      filter: { collection: { eq: $collection } }
    ) {
      posts: nodes {
        ...PostFragment
      }
    }
  }
`;
