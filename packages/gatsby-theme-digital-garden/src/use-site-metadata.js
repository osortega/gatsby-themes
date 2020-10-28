import { graphql, useStaticQuery } from 'gatsby';

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteAuthor
          siteUrl
          siteDescription
          siteLanguage
          siteTwitter
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

export default useSiteMetadata;
