import React, { Component } from 'react';
import { graphql } from 'gatsby';
import YouTube from 'react-youtube';
import './main.scss';

class BlobVideo extends Component {
  state = {
    player: {},
    playing: false,
  };
  render() {
    const { eyebrow, headline, supportive_text, video_thumbnail} = this.props;
    const opts = {
      height: '315',
      width: '640',
      playerVars: {
        autoplay: 1,
        enablejsapi: 1,
        rel: 0,
        mute: 1
      }
    };
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
              <p>{supportive_text}</p>
            </div>
            <div className="blob yt-v">
              
              <img src={video_thumbnail.localFile.childImageSharp.fluid.src} alt="video image" className="cover" />

              <YouTube
                videoId="2g811Eo7K8U"
                opts={opts}
                onReady={this._onReady}
              />

              {/* <iframe title="meh" width="460" height="315" data-src="https://www.youtube.com/embed/9xwazD5SyVg?autoplay=1&enablejsapi=1&rel=0&mute=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              <div className="vid-thumb"></div>
              <span className="stop"><img src="../global/images/hamburger-close.svg" alt="" /></span>
            </div>
          </div>
        </section>
    );
  }
  _onReady(event) {
    console.log(event.target);
    //this.state.player = event.target;
    event.target.pauseVideo();
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