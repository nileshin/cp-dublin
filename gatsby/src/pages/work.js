import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Header from '../modules/header';
import BlobVideo from '../modules/blob-video';
import WorkTiles from '../modules/work-tiles';
import CTATiles from '../modules/cta-tiles';
import LogoGrid from '../modules/logo-grid';

class Work extends Component {
  render() {
    const { data: { wordpressPage: page } } = this.props;
    const { acf } = page;

    return (
      <>
        <section className={`work ${page.slug}`}>
          <Header {...acf.header.header} />
          <BlobVideo {...acf.blob_video.blob_video} />
          <WorkTiles {...acf.work_tiles} />
          <LogoGrid {...acf.logo_grid} />
          <CTATiles {...acf.cta_tiles.cta_tiles} />
        </section>
      </>
    );
  }
}

export default Work;

export const query = graphql`
  query {
    wordpressPage(slug: { eq: "work" }) {
      id
      wordpress_id
      slug
      acf {
        header {
          header {
          ...HeaderFragment
          }
        }
        blob_video {
          blob_video {
            ...BlobVideoFragment
          }
        }
        work_tiles {
         ...WorkTilesFragment 
        }
        logo_grid {
          logo_grid {
            ...LogoGridFragment
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