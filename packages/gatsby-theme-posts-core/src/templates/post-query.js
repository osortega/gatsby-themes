import { graphql } from 'gatsby';

import PostPage from '../components/post-page';

export default PostPage;

export const query = graphql`
  query($id: String!, $prev: String, $next: String) {
    post(id: { eq: $id }) {
      ...PostFragment
    }
    prev: post(id: { eq: $prev }) {
      ...PostFragment
    }
    next: post(id: { eq: $next }) {
      ...PostFragment
    }
  }
`;
