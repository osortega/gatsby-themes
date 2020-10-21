import { useStaticQuery, graphql } from 'gatsby';
import { filterNodes } from '@maiertech/gatsby-helpers';

export const useTags = (filters) => {
  // This static query cannot be restricted to a specific tag collection.
  const data = useStaticQuery(graphql`
    query {
      allTag(sort: { fields: [collection, name], order: [ASC, ASC] }) {
        nodes {
          ...TagFragment
        }
      }
    }
  `);

  return filterNodes(data, filters);
};
