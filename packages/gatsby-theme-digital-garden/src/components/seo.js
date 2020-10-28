import React from 'react';
import { string } from 'prop-types';
import { Helmet } from 'react-helmet';

import useSiteMetadata from '../use-site-metadata';

const SEO = ({ title, description, pathname, children, canonicalUrl }) => {
  const site = useSiteMetadata();

  const {
    siteTitle,
    siteTitleDefault: defaultTitle,
    siteUrl,
    siteDescription: defaultDescription,
    siteLanguage,
    siteTwitter,
  } = site;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ''}`,
  };

  let canonical;
  if (canonicalUrl) canonical = <link rel="canonical" href={canonicalUrl} />;

  return (
    <Helmet
      title={title}
      defaultTitle={defaultTitle}
      titleTemplate={`%s | ${siteTitle}`}
    >
      <html lang={siteLanguage} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content={seo.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.description} />
      <meta name="twitter:creator" content={siteTwitter} />
      <meta
        name="gatsby-theme"
        content="@maiertech/gatsby-theme-digital-garden"
      />
      {canonical}
      {children}
    </Helmet>
  );
};

SEO.propTypes = {
  title: string,
  description: string,
  pathname: string,
  children: Node,
  canonicalUrl: string,
};

export default SEO;
