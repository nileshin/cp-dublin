import React, { Component } from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Header from '../modules/header';
import BlobVideoWithTextCTAs from '../modules/blob-video-text-ctas';
import WorkTilesNoFilter from '../modules/work-tiles-no-filter';
import LogoGrid from '../modules/logo-grid';

class LandingPages extends Component {
  render() {
    const { data: { wordpressPage: page, wordpressPage: { acf } } } = this.props;
    console.log(page)

    return (
      <>
        <SEO {...page.yoast_meta} {...page.cp_meta.yoast_social} />
        <section className={`category-landing page-${page.slug}`}>
          <Header {...acf.header.header} />
          <BlobVideoWithTextCTAs {...acf.blob_video_w_text_ctas.blob_video_w_text_ctas} />
          <WorkTilesNoFilter {...acf.work_tiles} />
          <LogoGrid {...acf.logo_grid.logo_grid} />
        </section>
      </>
    );
  }
}

export default LandingPages;

export const query = graphql`
  query {
    wordpressPage(wordpress_parent: {eq: 2370}) {
      id
      wordpress_id
      slug
      ...YoastMetadataFragment
      acf {
        header {
          header {
          ...HeaderFragment
          }
        }
        blob_video_w_text_ctas {
          blob_video_w_text_ctas {
            ...BlobVideoWithTextCTAsFragment
          }
        }
        work_tiles {
         ...WorkTilesNoFilterFragment 
        }
        logo_grid {
          logo_grid {
            ...LogoGridFragment
          }
        }
      }
    }
  }
`;