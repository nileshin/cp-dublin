import React, { Component } from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Header from '../modules/header';
// import BlobVideoWithTextCTAs from '../modules/blob-video-text-ctas';
import WorkTilesNoFilter from '../modules/work-tiles-no-filter';
import LogoGrid from '../modules/logo-grid';

class LandingPages extends Component {
  render() {
    // const { data: { wordpressPage: page, wordpressPage: { acf } } } = this.props;

    return (
      <>
        {/* <SEO {...page.yoast_meta} {...page.cp_meta.yoast_social} /> */}
        <section className={`category-landing page-`}>
          {/* <Header {...acf.header.header} />
          <BlobVideoWithTextCTAs {...acf.blob_video_w_text_ctas.blob_video_w_text_ctas} />
          <WorkTilesNoFilter {...acf.work_tiles.work_tiles} />
          <LogoGrid {...acf.logo_grid.logo_grid} /> */}
        </section>
      </>
    );
  }
}

export default LandingPages;

export const query = graphql`
  query($id: String!) {
    wordpressWpLandingPages(id: { eq: $id }) {
      id
      wordpress_id
      slug
      ...YoastMetadataFragmentLandingPages
      acf {
        landing_page_content_landing_pages {
          __typename
          ... on WordPressAcf_header {
            id
            header {
              ...HeaderFragmentCase
            }
          }
          ... on WordPressAcf_blob_video_w_text_ctas {
            id
            blob_video_w_text_ctas {
              ...BlobVideoWithTextCTAsFragment
            }
          }
          ... on WordPressAcf_work_tiles {
            id
            case_tiles {
              ...WorkTilesNoFilterFragment 
            }
          }
          ... on WordPressAcf_text__image_module {
            id
            content_tile_w_side_image {
              ...ContentTileWithSideImageFragmentCase
            }
          }
          ... on WordPressAcf_logo_grid {
            id
            logo_grid {
              ...LogoGridFragmentCase
            }
          }
        }
      }
    }
  }
`;