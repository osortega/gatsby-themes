import { graphql } from 'gatsby';

export const fragment = graphql`
  fragment PageFragment on Page {
    id
    title
    description
    image
    body
    path
  }
`;
