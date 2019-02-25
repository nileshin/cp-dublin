import React, { Component } from 'react';
import { graphql } from 'gatsby';
import './main.scss';
import './main.js';

class BlobVideo extends Component {
  render() {
    const { eyebrow, headline, supportive_text, video_thumbnail, video_embed_code} = this.props;

    return (
        <section className="content-blob">
          <div style={{display: "none"}}>
            BlobVideo
            <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
          </div>
          <div className="container">
            <div className="col-md-6">
              <h4 className="eyebrow">{eyebrow}</h4>
              <h2
                  dangerouslySetInnerHTML={{
                    __html: headline,
                  }}
                />
              <div
                dangerouslySetInnerHTML={{
                  __html: supportive_text,
                }}
              />
            </div>
            <div className="blob yt-v">
              
              <img src={video_thumbnail.localFile.childImageSharp.fluid.src} alt="video thumb" className="cover" />
              <div
                dangerouslySetInnerHTML={{
                  __html: video_embed_code ,
                }}
              />
              <div className="vid-thumb"></div>
              <span className="stop"><img src="../global/images/hamburger-close.svg" alt="" /></span>
            </div>
          </div>
        </section>
    );
  }
}

export default BlobVideo;

export const blobVideoFragment = graphql`
  fragment BlobVideoFragment on blobVideo_8 {
    video_embed_code
    eyebrow
    headline
    supportive_text
    video_thumbnail {
      ...WpMediaFragmentFluid1440
    }
  }
`;