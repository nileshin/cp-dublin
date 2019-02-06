import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

const SEO = ({
  description,
  title,
  og_title,
  og_description,
  og_image,
  tw_title,
  tw_image,
  tw_description,
}) => {
  const helmetData = {
    title,
    htmlAttributes: {
      lang: 'en',
    },
    meta: [
      {
        name: 'description',
        content: description,
      },
      {
        property: `og:title`,
        content: og_title,
      },
      {
        property: `og:image`,
        content: og_image,
      },
      {
        property: `og:description`,
        content: og_description,
      },
      {
        property: `og:type`,
        content: 'website'
      },
      {
        name: `twitter:card`,
        content: `summary`
      },
      {
        name:`twitter:title`,
        content: tw_title
      },
      {
        name:`twitter:image`,
        content: tw_image
      },
      {
        name:`twitter:description`,
        content: tw_description
      }
    ],
  };
  helmetData.meta = helmetData.meta.filter(m => m && m.content);
  return <Helmet {...helmetData} />;
};

export default SEO;

export const yoastMetadataFragment = graphql`
  fragment YoastMetadataFragment on wordpress__PAGE {
    yoast_meta {
      title: yoast_wpseo_title
      description: yoast_wpseo_metadesc
      canonical: yoast_wpseo_canonical
    }
    cp_meta {
      yoast_social {
        og_title: yoast_wpseo_opengraph_title
        og_description: yoast_wpseo_opengraph_description
        og_image: yoast_wpseo_opengraph_image
        tw_title: yoast_wpseo_twitter_title
        tw_description: yoast_wpseo_twitter_description
        tw_image: yoast_wpseo_twitter_image
      }
    }
  }
`;
