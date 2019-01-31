import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Header from '../modules/header';
import ContentTileWithSideImage from '../modules/content-tile-w-side-image';
import ImageTextPairing from '../modules/image-text-pairing';
import CTATiles from '../modules/cta-tiles';
import CapabilitiesTiles from '../modules/capabilities-tiles';

class About extends Component {
  render() {
    const { data: { wordpressPage: { acf } } } = this.props;
    return (<Layout>
      About Page
      <Header {...acf.header.header} />
      <ContentTileWithSideImage {...acf.defiantly_human_section.content_tile_w_side_image} />
      <ImageTextPairing {...acf.why_boston_section.image_text_pairing} />
      <ImageTextPairing {...acf.why_dublin_section.image_text_pairing} />
      <CapabilitiesTiles {...acf.capabilities.capabilities_tiles} />
      <CTATiles {...acf.cta_tiles.cta_tiles} />
    </Layout>);
  }
}

export default About;

export const query = graphql`
  query {
    wordpressPage(slug: { eq: "about" }) {
      id
      wordpress_id
      acf {
        header {
          header {
            ...HeaderFragment
          }
        }
        defiantly_human_section {
          content_tile_w_side_image {
            ...ContentTileWithSideImageFragment
          }
        }
        why_boston_section {
          image_text_pairing {
            ...ImageTextPairingBostonFragment
          }
        }
        why_dublin_section {
          image_text_pairing {
            ...ImageTextPairingDublinFragment
          }
        }
        capabilities {
          capabilities_tiles {
            ...CapabilitiesTilesFragment
          }
        }
        cta_tiles {
          cta_tiles {
            ...CTATileFragment
          }
        }
      }
    }
  }
`;
