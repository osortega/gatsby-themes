import { graphql } from 'gatsby';

export const fragment = graphql`
  fragment TagFragment on Tag {
    id
    collection
    name
    path
  }
`;
