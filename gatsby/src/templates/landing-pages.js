import React, { Component } from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';

class LandingPages extends Component {
  render() {
    // const { data: { wordpressPage: page, wordpressPage: { acf } } } = this.props;

    return (
      <>
        {/* <SEO {...page.yoast_meta} {...page.cp_meta.yoast_social} /> */}
        <section className={`category-landing page-`}>
          {/* <Header {...acf.header.header} />
          <BlobVideo {...acf.blob_video.blob_video} />
          <WorkTiles {...acf.work_tiles} />
          <LogoGrid {...acf.logo_grid.logo_grid} />
          <CTATiles {...acf.cta_tiles.cta_tiles} /> */}
        </section>
      </>
    );
  }
}

export default LandingPages;