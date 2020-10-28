import React from 'react';
import { object } from 'prop-types';
import { Container, Heading, Link as TLink, Styled } from 'theme-ui';
import { Link } from 'gatsby';
import { PostPreview } from '@maiertech/components';

import Layout from './layout';
import SEO from './seo';

const ShadowedTagPage = ({ data, location, pageContext }) => {
  const { tag } = pageContext;
  const { pathname } = location;
  const taggedItems = data.allMdx.nodes.map(
    ({
      id,
      frontmatter: { title, date, datetime },
      fields: { collection, path },
    }) => ({
      id,
      path,
      taggedItem: {
        collection,
        title: (
          <Heading as="h2" mb={1}>
            {title}
          </Heading>
        ),
        date,
        datetime,
      },
    })
  );
  return (
    <Layout>
      <SEO
        title={tag}
        description={`Content tagged with ${tag}.`}
        pathname={pathname}
      />
      <Container variant="narrow">
        <Styled.h1>{tag}</Styled.h1>
        {taggedItems.map(({ id, path, taggedItem }) => (
          <TLink as={Link} key={id} href={path} sx={{ color: 'inherit' }}>
            <PostPreview post={taggedItem} mb={3} />
          </TLink>
        ))}
      </Container>
    </Layout>
  );
};

ShadowedTagPage.propTypes = {
  data: object.isRequired,
  location: object.isRequired,
  pageContext: object.isRequired,
};

export default ShadowedTagPage;
