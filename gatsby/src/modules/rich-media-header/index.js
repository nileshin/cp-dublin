import React, { Component } from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import './main.scss'

class RichMediaHeader extends Component {
  render() {
    const {lightdark_mode, project_title, image} = this.props;
    return (  
    <section className={`banner-full bg-cover ${!lightdark_mode && 'dark-mode'}`}>
      <div style={{ display: 'none' }}>
        LeadershipDetailCarousel
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <div className="banner-full__content">
              <small className="small-head">Four Seasons Hotels and Resorts</small>
              <h1 dangerouslySetInnerHTML={{
                  __html: project_title,
                }}/>
            </div>
          </div>
        </div>
      </div>
      <Img
        fluid={image.localFile.childImageSharp.fluid}
        alt={image.alt_text}
        className="cover"
      />
    </section>
    );
  }
}

export default RichMediaHeader;

export const RichMediaHeaderFragment = graphql`
  fragment RichMediaHeaderFragment on richMediaHeader_15 {
    rich_media_header {
      lightdark_mode
      project_title
      image {
        ...WpMediaFragmentFluid1440
      }
    }
  }
`;
